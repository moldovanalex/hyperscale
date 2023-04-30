import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate, useNavigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { Amplify, Auth } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import { useAuthenticator } from "@aws-amplify/ui-react";

import LandingPage from "../LandingPage/LandingPage";
import NavigationBar from "../NavigationBar/NavigationBar";
import LogInPage from "../LogInPage/LogInPage";
import SignUpPage from "../SignUpPage/SignUpPage";
import DocumentProcessingPage from "../DocumentProcessingPage/DocumentProcessingPage";

import "./App.scss";

Amplify.configure(awsExports);
Amplify.configure({
  region: "eu-west-2",
});

function App(props) {
  const { user } = useAuthenticator((context) => [context.user]);
  const navigate = useNavigate();
  const [hasNavigatedToLandingPage, setHasNavigatedToLandingPage] =
    useState(false);

  useEffect(() => {
    if (!hasNavigatedToLandingPage && !user) {
      navigate("/landing-page", { replace: true });
      setHasNavigatedToLandingPage(true);
    }
  }, []);

  return (
    <div className="App">
      <NavigationBar user={user} />
      <Routes>
        <Route path="/landing-page" element={<LandingPage user={user} />} />
        <Route path="/log-in" element={<LogInPage user={user} />} />
        <Route path="/sign-up" element={<SignUpPage user={user} />} />
        <Route
          path="/document-processing"
          element={
            <ProtectedRoute user={user}>
              <DocumentProcessingPage user={user} />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
