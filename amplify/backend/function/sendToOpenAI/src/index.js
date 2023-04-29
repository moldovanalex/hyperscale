/* Amplify Params - DO NOT EDIT
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

async function sendDataToOpenAI({ data, fileName, fileKey }) {
  console.log("data = ", data);
}

exports.handler = async (event) => {
  console.log("OpenAI = ", OpenAI);

  return;

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
      });
    } catch (err) {
      console.log("err = ", err);
    }
  }
};
