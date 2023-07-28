const AWS = require("aws-sdk");
const textract = new AWS.Textract({
  region: process.env.REGION,
});

async function startTextExtraction(objectKey) {
  const params = {
    DocumentLocation: {
      S3Object: {
        Bucket: process.env.STORAGE_HYPERSCALES3_BUCKETNAME,
        Name: objectKey,
      },
    },
    NotificationChannel: {
      RoleArn: "arn:aws:iam::187314216047:role/TextractPublishToSNSRole",
      SNSTopicArn:
        "arn:aws:sns:eu-west-2:187314216047:AmazonTextract-JobStatuses-topic",
    },
    OutputConfig: {
      S3Bucket: process.env.STORAGE_HYPERSCALES3_BUCKETNAME,
      S3Prefix: `extracted-text/${objectKey
        .replace("public/", "")
        .split("/")
        .slice(0, -1)
        .join("/")}`,
    },
  };

  try {
    const textractResponse = await textract
      .startDocumentTextDetection(params)
      .promise();
  } catch (err) {
    console.log("err = ", err);
  }
}

exports.handler = async (event) => {
  for (let i = 0; i < event.Records.length; i++) {
    let record = event.Records[i];
    let objectKey = decodeURIComponent(
      record.s3.object.key.replace(/\+/g, " ")
    );

    try {
      if (objectKey.startsWith("extracted-text")) {
        continue;
      }

      if (objectKey.startsWith("public")) {
        if (!objectKey.endsWith(".pdf")) {
          throw new Error("Not a PDF");
        }

        await startTextExtraction(objectKey);
      }
    } catch (err) {
      console.log("err = ", err);
    }
  }

  return "ok";
};
