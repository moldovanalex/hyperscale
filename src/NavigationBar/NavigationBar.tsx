import React from "react";
import { Link } from "react-router-dom";

import { Auth } from "aws-amplify";
import { Typography } from "antd";
import { useAuthenticator } from "@aws-amplify/ui-react";

import "./NavigationBar.scss";

const navigationLogo = require("./logo.png");

export default function NavigationBar(props: any) {
  const { user } = useAuthenticator((context) => [context.user]);

  async function handleSignOut() {
    await Auth.signOut({ global: true });
    window.location.reload();
  }

  return (
    <div>
      <div className="navigation-bar">
        <Link to="/landing-page" className="main-page-redirect-wrapper">
          <div className="logo-and-brand-name-wrapper">
            <img src={navigationLogo} alt="" className="logo"></img>
            <Typography.Text className="brand">HYPERSCALE</Typography.Text>
          </div>
        </Link>
        <div className="navigation-bar-actions">
          {user ? (
            <div
              onClick={async () => await handleSignOut()}
              className="sign-out-container"
            >
              <Typography.Text>Sign out</Typography.Text>
            </div>
          ) : (
            <div className="public-actions">
              <Link to="/log-in">
                <Typography.Text>Log in</Typography.Text>
              </Link>
              <Typography.Text>Sign up</Typography.Text>
              <Typography.Text>Contact</Typography.Text>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
