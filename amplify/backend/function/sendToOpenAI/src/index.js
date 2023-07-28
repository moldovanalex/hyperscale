/* Amplify Params - DO NOT EDIT
	API_HYPERSCALE_DOCUMENTPROCESSINGRECORDTABLE_ARN
	API_HYPERSCALE_DOCUMENTPROCESSINGRECORDTABLE_NAME
	API_HYPERSCALE_GRAPHQLAPIENDPOINTOUTPUT
	API_HYPERSCALE_GRAPHQLAPIIDOUTPUT
	AUTH_HYPERSCALE3CE15CDC_USERPOOLID
	ENV
	REGION
	STORAGE_HYPERSCALES3_BUCKETNAME
Amplify Params - DO NOT EDIT */

const { Configuration, OpenAIApi } = require("openai");
const AWS = require("aws-sdk");
const configuration = new Configuration({
  organization: process.env.HYPERSCALE_OPENAI_ORGANISATION_ID,
  apiKey: process.env.HYPERSCALE_OPENAI_SECRET_KEY,
});
const OpenAI = new OpenAIApi(configuration);
const { nodeCallAppSync } = require("./helpers.js");
const queries = require("./queries.js");

const s3Client = new AWS.S3({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION,
});
const SES = new AWS.SES({ apiVersion: "2010-12-01", region: "eu-west-1" });
const { getHtmlEmailContent } = require("./email.js");

async function getSingleFileFromS3({ bucket, key }) {
  let downloadParams;
  try {
    downloadParams = {
      Bucket: bucket,
      Key: key,
    };
    if (key.includes("/null") || key.includes("/undefined")) {
      console.log("not downloading file since key contains null or undefined");
      return null;
    }
    if (key[key.length - 1] === "/") {
      console.log(
        "not downloading file because the key ends in a slash, so it means it's missing something"
      );
      return null;
    }
    const file = (await s3Client.getObject(downloadParams).promise()).Body;
    return file;
  } catch (e) {
    throw new Error(
      `Failed to download file: ${key
        .split("attachments/")
        .pop()}. It has probably been removed.`
    );
  }
}

async function sendDataToOpenAI({ data, fileName, author }) {
  const content = data.processedPages.map((page) => page.content).join(" ");

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Generate insights about this document." },
    { role: "user", content: content },
  ];
  const model = "gpt-3.5-turbo";

  try {
    const response = await OpenAI.createChatCompletion({
      model: model,
      messages: messages,
      max_tokens: 1000,
      n: 1,
      temperature: 1,
    });

    const generatedText = response.data.choices[0].message.content;

    const emailParams = {
      Source: `"Hyperscale" <alexmdv1999@gmail.com>`,
      Destination: {
        ToAddresses: [author],
      },
      Message: {
        Subject: {
          Data: "Document Analysis",
          Charset: "UTF-8",
        },
        Body: {
          Html: {
            Data: getHtmlEmailContent(generatedText, fileName),
            Charset: "UTF-8",
          },
        },
      },
    };

    try {
      await SES.sendEmail(emailParams).promise();
    } catch (err) {
      console.log("err = ", err);
    }
  } catch (err) {
    console.log("err = ", err);
  }
}

exports.handler = async (event) => {
  try {
    const documentProcessingRecordsResponse = await nodeCallAppSync({
      query: queries.listDocumentProcessingRecords,
      variables: {
        organisation: "HYPERSCALE",
      },
    });

    const documentProcessingRecords =
      documentProcessingRecordsResponse.data.listDocumentProcessingRecords
        .items;

    for (let i = 0; i < event.Records.length; i++) {
      let record = event.Records[i];
      let objectKey = decodeURIComponent(
        record.s3.object.key.replace(/\+/g, " ")
      );

      try {
        const rawData = await getSingleFileFromS3({
          bucket: process.env.STORAGE_HYPERSCALES3_BUCKETNAME,
          key: objectKey,
        });

        const fileName = objectKey.split("/").slice(-1)[0];
        const data = JSON.parse(rawData.toString("utf8"));

        await sendDataToOpenAI({
          data,
          fileName,
          author: documentProcessingRecords.find(
            (x) => x.s3Key === fileName.replace(".json", "")
          ).author,
        });
      } catch (err) {
        console.log("err = ", err);
      }
    }
  } catch (err) {
    console.log("err = ", err);
  }
};
