import React, { useState } from "react";

import { Navigate } from "react-router-dom";

import { Authenticator } from "@aws-amplify/ui-react";

import "./LogInPage.scss";

export default function LogInPage(props) {
  return (
    <div className="log-in-page">
      <div className="authenticator-wrapper">
        <Authenticator>
          {({ signOut, user }) => {
            return <Navigate to="/document-processing" replace={true} />;
          }}
        </Authenticator>
        <div className="log-in-form-glow"></div>
      </div>
    </div>
  );
}
