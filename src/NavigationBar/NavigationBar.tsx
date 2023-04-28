import React from "react";
import { Link } from "react-router-dom";

import { Typography } from "antd";

import "./NavigationBar.scss";

const navigationLogo = require("./logo.png");

export default function NavigationBar(props: any) {
  return (
    <div>
      <div className="navigation-bar">
        <div className="logo-and-brand-name-wrapper">
          <img src={navigationLogo} alt="" className="logo"></img>
          <Typography.Text className="brand">HYPERSCALE</Typography.Text>
        </div>
        <div className="navigation-bar-actions">
          <Link to="/log-in">
            <Typography.Text>Log in</Typography.Text>
          </Link>
          <Typography.Text>Sign up</Typography.Text>
          <Typography.Text>Contact</Typography.Text>
        </div>
      </div>
    </div>
  );
}
