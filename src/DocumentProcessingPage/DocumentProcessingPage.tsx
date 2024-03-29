import React, { useState } from "react";

import { Typography } from "antd";

import { ThemeProvider } from "@aws-amplify/ui-react";
import { StorageManager } from "@aws-amplify/ui-react-storage";

import { API, graphqlOperation } from "aws-amplify";
import { createDocumentProcessingRecord } from "../graphql/mutations";

import "./DocumentProcessingPage.scss";

const myTheme = {
  name: "my-theme",
  tokens: {
    colors: {
      font: {
        primary: { value: "#000000" },
      },
    },
  },
};

const overrides = {
  uploadSuccessfulText: "Upload successful.",
  getUploadingText(percentage) {
    return `Uploading ${percentage}%`;
  },
};

export default function DocumentProcessingPage({ user }) {
  async function onUploadSuccess({ key }) {
    await API.graphql({
      query: createDocumentProcessingRecord,
      variables: {
        input: {
          author: user.attributes.email,
          organisation: "HYPERSCALE",
          s3Key: key.split("/").pop(),
        },
      },
    });
  }

  return (
    <div className="document-processing-page">
      <div className="welcome-message-container">
        <Typography.Text className="welcome-message">
          Welcome to Hyperscale.
          <br />
          Start by uploading a document and let the tool analyze it for you.
          <br />
          We will email the generated insights to the address that you signed up
          with.
        </Typography.Text>
        <span className="welcome-message-glow"></span>
      </div>
      <div className="wrapper">
        <div className="file-uploader-card">
          <ThemeProvider theme={myTheme}>
            <StorageManager
              acceptedFileTypes={[".pdf"]}
              accessLevel="public"
              maxFileCount={100}
              onUploadSuccess={onUploadSuccess}
              path="user-documents/"
              onUploadError={(error) => console.log(error)}
              displayText={overrides}
            />
          </ThemeProvider>
        </div>
        <span className="file-uploader-glow"></span>
      </div>
    </div>
  );
}
