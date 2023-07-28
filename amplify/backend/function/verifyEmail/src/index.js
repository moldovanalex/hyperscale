/* Amplify Params - DO NOT EDIT
	API_HYPERSCALE_GRAPHQLAPIENDPOINTOUTPUT
	API_HYPERSCALE_GRAPHQLAPIIDOUTPUT
	AUTH_HYPERSCALE3CE15CDC_USERPOOLID
	ENV
	REGION
Amplify Params - DO NOT EDIT */

const AWS = require("aws-sdk");

const SES = new AWS.SES({ region: "eu-west-1" });

exports.handler = async (event) => {
  console.log(`EVENT: ${JSON.stringify(event)}`);

  if (!event.body) {
    console.log("No event body provided");

    return;
  }

  const email = JSON.parse(event.body).email;

  await SES.verifyEmailIdentity({ EmailAddress: email }).promise();

  return {
    statusCode: 200,
    body: JSON.stringify("Hello from Lambda!"),
  };
};
