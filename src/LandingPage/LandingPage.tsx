import React from "react";
import { Link } from "react-router-dom";

import { Button, Typography } from "antd";

import "./LandingPage.scss";

const mainLogo = require("./mainLogo.png");

export default function LandingPage({ user }) {
  return (
    <div className="landing-page">
      <div className="landing-page-content">
        <div>
          <div className="main-logo-container">
            <img src={mainLogo} alt="" className="main-logo"></img>
            <span className="main-logo-glow"></span>
          </div>
          <Typography.Title className="main-title">HYPERSCALE</Typography.Title>
        </div>
        <span className="content-glow"></span>
        <div className="main-description-container">
          <h1 className="main-description">
            AI-based, cloud-native, hyper-scalable processing tool for documents
            and images
          </h1>
          <Typography.Text className="secondary-description">
            Hyperscale is a tool that analyzes and processes documents and
            images using Amazon Rekognition and Amazon Textract.
          </Typography.Text>
          <div className="main-description-actions">
            <Link to={user ? "/document-processing" : "/log-in"}>
              <div className="get-started-button-wrapper">
                <button color="white" className="get-started-button">
                  Get Started
                </button>
                <div className="get-started-button-glow"></div>
              </div>
            </Link>
            <button color="black" className="github-button">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
