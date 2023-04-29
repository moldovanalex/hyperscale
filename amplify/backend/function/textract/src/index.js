const AWS = require("aws-sdk");
const textract = new AWS.Textract({
  region: process.env.REGION,
});
const s3Client = new AWS.S3({
  apiVersion: "2006-03-01",
  region: process.env.AWS_REGION,
});

async function getTextDetectionDetails(message) {
  try {
    let blocks;
    let nextToken;

    while (nextToken || !blocks) {
      if (!blocks) {
        blocks = [];
      }

      let params = {
        JobId: message.JobId,
        MaxResults: 1000,
        NextToken: nextToken ? nextToken : message.NextToken,
      };

      const textDetectionResult = await textract
        .getDocumentTextDetection(params)
        .promise();
      nextToken = textDetectionResult.NextToken;
      const lineBlocks = textDetectionResult.Blocks.filter(
        (block) => block.BlockType === "LINE"
      );
      blocks = [...blocks, ...lineBlocks];
    }

    return blocks;
  } catch (e) {
    console.log("Error while loading text detection details: ");
    throw e;
  }
}

function processTextDetectionDetails(blocks) {
  const pages = [];

  for (let block of blocks) {
    if (block.BlockType !== "LINE") {
      continue;
    }

    let pageNumber = block.Page - 1;

    if (!pages[pageNumber]) {
      pages[pageNumber] = {
        pageNumber,
        content: "",
      };
    }
    pages[pageNumber].content += `${block.Text} `;
  }

  return pages;
}

exports.handler = async (event) => {
  console.log("event = ", JSON.stringify(event, null, 2));

  for (const record of event.Records) {
    const message = JSON.parse(record.Sns.Message);
    const blocks = await getTextDetectionDetails(message);
    const processedPages = processTextDetectionDetails(blocks);
    const objectKey = message.DocumentLocation.S3ObjectName;

    const uploadParams = {
      Bucket: process.env.STORAGE_HYPERSCALES3_BUCKETNAME,
      Key: `${objectKey.replace("public/", "ready-for-openai/")}.json`,
      Body: JSON.stringify({
        fileKey: objectKey,
        processedPages,
      }),
    };

    try {
      await s3Client.upload(uploadParams).promise();
    } catch (err) {
      console.log("err = ", err);
    }
  }
};
