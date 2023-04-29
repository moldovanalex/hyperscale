import React from "react";

import { Typography } from "antd";

import { FileUploader, ThemeProvider } from "@aws-amplify/ui-react";

import "./DocumentProcessingPage.scss";

const myTheme = {
  name: "my-theme",
  tokens: {
    colors: {
      font: {
        primary: { value: "#000000" },
      },
    },
    fonts: {
      default: {
        // variable: { value: "Raleway, sans-serif" },
        // static: { value: "Raleway, sans-serif" },
      },
    },
  },
};

export default function DocumentProcessingPage() {
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
            <FileUploader
              acceptedFileTypes={[".pdf"]}
              accessLevel="public"
              variation="drop"
            />
          </ThemeProvider>
        </div>
        <span className="file-uploader-glow"></span>
      </div>
    </div>
  );
}
