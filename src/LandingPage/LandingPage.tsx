import React from "react";

import { Button, Typography } from "antd";

import "./LandingPage.scss";

const navigationLogo = require("./logo.png");
const mainLogo = require("./mainLogo.png");

export default function LandingPage() {
  return (
    <div className="landing-page">
      <div className="navigation-bar">
        <div className="logo-and-brand-name-wrapper">
          <img src={navigationLogo} alt="" className="logo"></img>
          <Typography.Text className="brand">HYPERSCALE</Typography.Text>
        </div>
        <div className="navigation-bar-actions">
          <Typography.Text>Log in</Typography.Text>
          <Typography.Text>Sign up</Typography.Text>
          <Typography.Text>Contact</Typography.Text>
        </div>
      </div>
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
            The Rust-powered successor to Webpack
          </h1>
          <Typography.Text className="secondary-description">
            Turbopack is an incremental bundler optimized for JavaScript and
            TypeScript, written in Rust.
          </Typography.Text>
          <div className="main-description-actions">
            <button color="white" className="get-started-button">
              Get Started
            </button>
            <button color="black" className="github-button">
              GitHub
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}
