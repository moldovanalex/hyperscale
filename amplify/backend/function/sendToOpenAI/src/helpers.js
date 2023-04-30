const AWS = require("aws-sdk");
const https = require("https");

async function nodeCallAppSync({ query, mutation, variables }) {
  try {
    if (!mutation && !query) {
      throw new Error("Both query and mutation undefined");
    }

    query = query || mutation;
    const operationNameUpperCase = query.split("(")[0].split(" ").slice(-1)[0];
    const appsyncUrl = process.env.API_HYPERSCALE_GRAPHQLAPIENDPOINTOUTPUT;
    const region = process.env.AWS_REGION;
    const endpoint = new URL(appsyncUrl).hostname;
    const req = new AWS.HttpRequest(appsyncUrl, region);

    req.method = "POST";
    req.path = "/graphql";
    req.headers.host = endpoint;
    req.headers["Content-Type"] = "application/json";
    req.body = JSON.stringify({
      query,
      operationName: operationNameUpperCase,
      variables,
    });

    const signer = new AWS.Signers.V4(req, "appsync", true);
    signer.addAuthorization(AWS.config.credentials, AWS.util.date.getDate());

    const data = await new Promise((resolve, reject) => {
      const httpRequest = https.request(
        { ...req, host: endpoint },
        (result) => {
          let data = "";

          result.on("data", (chunk) => {
            data += chunk;
          });

          result.on("end", () => {
            resolve(JSON.parse(data.toString()));
          });
        }
      );

      httpRequest.write(req.body);
      httpRequest.end();
    });

    return data;
  } catch (e) {
    throw e;
  }
}

module.exports = {
  nodeCallAppSync,
};
