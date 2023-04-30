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
  organization: "org-GeDBSOU0Lv8UXxiKTVWA1gfm",
  apiKey: process.env.HYPERSCALE_OPENAI_SECRET_KEY,
});
const OpenAI = new OpenAIApi(configuration);
const { nodeCallAppSync } = require("./helpers.js");
const queries = require("./queries.js");

const s3Client = new AWS.S3({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION,
});
const https = require("https");

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

async function sendDataToOpenAI({ data, fileName, fileKey, author }) {
  console.log("author = ", author);

  return;

  const messages = [
    { role: "system", content: "You are a helpful assistant." },
    { role: "user", content: "Generate insights about this document." },
    { role: "user", content: data },
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

    console.log("response.data = ", JSON.stringify(response.data, null, 2));

    const generatedText = response.data.choices[0].message.content;

    console.log("generatedText = ", generatedText);
  } catch (err) {
    console.log("err.response.data = ", err.response?.data);
  }
}

exports.handler = async (event) => {
  const documentProcessingRecordsResponse = await nodeCallAppSync({
    query: queries.listDocumentProcessingRecords,
    variables: {
      organisation: "HYPERSCALE",
    },
  });

  const documentProcessingRecords =
    documentProcessingRecordsResponse.data.listDocumentProcessingRecords.items;

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
      const data = rawData.toString("utf8");

      await sendDataToOpenAI({
        data,
        fileName,
        fileKey: JSON.parse(data).fileKey,
        author: documentProcessingRecords.find(
          (x) => x.s3Key === fileName.replace(".json", "")
        ).author,
      });
    } catch (err) {
      console.log("err = ", err);
    }
  }
};
