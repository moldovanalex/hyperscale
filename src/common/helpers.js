// import { Auth } from "aws-amplify";
// import axios from "axios";

// import awsExports from "../aws-exports";

// export async function callRest({
//   method,
//   route,
//   body,
//   message = "",
//   includeCredentials = true,
//   isJson = true,
//   isBlob = false,
// }) {
//   let session = await getCurrentSession();

//   if (includeCredentials && body && typeof body === "object") {
//     const user = await Auth.currentAuthenticatedUser();
//     body.accessToken = session.accessToken.jwtToken;
//     body.refreshToken = session.refreshToken.token;
//     body.idToken = session.idToken.jwtToken;
//     body.cognitoClientId = user.pool.clientId;
//     body.restUrl = getRestEndpoint();
//     body.graphQLUrl = awsExports.aws_appsync_graphqlEndpoint;
//   }

//   return await captureError({
//     callback: async () => {
//       let response = null;
//       try {
//         let headers = {
//           Authorization: `${session.idToken.jwtToken}`,
//         };

//         if (isJson) {
//           headers["Content-Type"] = "application/json";
//         }
//         const axiosParams = {
//           url: `${getRestEndpoint()}${route}`,
//           method,
//           data: body,
//           headers,
//         };
//         if (isBlob) {
//           axiosParams.responseType = "blob";
//         }
//         const rawResponse = await axios(axiosParams);
//         response = rawResponse.data;

//         if (response && response.error) {
//           throw new Error(response.error);
//         }

//         return response;
//       } catch (e) {
//         throw e;
//       }
//     },
//     message,
//   });
// }

// async function captureError({ callback, message, displayError }) {
//   try {
//     const result = await callback();
//     return result;
//   } catch (e) {
//     throw e;
//   }
// }

// export async function getCurrentSession() {
//   let session;
//   let tryCount = 0;
//   while (!session && tryCount < 5) {
//     tryCount++;
//     try {
//       session = await Auth.currentSession();
//       if (tryCount > 1) {
//         console.log("found current user after retry");
//       }
//     } catch (e) {
//       console.log("looking for current user - retrying");
//       await new Promise((resolve) => setTimeout(resolve, 500));
//     }
//   }
//   return session;
// }

// export function getRestEndpoint() {
//   const restApiElement = awsExports.aws_cloud_logic_custom.find(
//     (x) => x.name === "rest"
//   );
//   return restApiElement.endpoint;
// }
