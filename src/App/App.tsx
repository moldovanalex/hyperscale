import React, { useState, useEffect } from "react";
import { Route, Routes, Navigate } from "react-router-dom";
import ProtectedRoute from "../ProtectedRoute/ProtectedRoute";

import { Amplify, Auth } from "aws-amplify";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";
import { useAuthenticator } from "@aws-amplify/ui-react";

import LandingPage from "../LandingPage/LandingPage";
import NavigationBar from "../NavigationBar/NavigationBar";
import LogInPage from "../LogInPage/LogInPage";
import DocumentProcessingPage from "../DocumentProcessingPage/DocumentProcessingPage";

import "./App.scss";

Amplify.configure(awsExports);

function App(props) {
  const { user } = useAuthenticator((context) => [context.user]);

  return (
    <div className="App">
      <NavigationBar user={user} />
      <Routes>
        <Route path="/landing-page" element={<LandingPage user={user} />} />
        <Route path="/log-in" element={<LogInPage user={user} />} />
        <Route
          path="/document-processing"
          element={
            <ProtectedRoute user={user}>
              <DocumentProcessingPage />
            </ProtectedRoute>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
