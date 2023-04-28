import React from "react";
import { Routes, Route } from "react-router-dom";

import { Amplify } from "aws-amplify";
import { Authenticator } from "@aws-amplify/ui-react";
import "@aws-amplify/ui-react/styles.css";
import awsExports from "../aws-exports";

import LandingPage from "../LandingPage/LandingPage";
import NavigationBar from "../NavigationBar/NavigationBar";

import "./App.scss";

Amplify.configure(awsExports);

function App() {
  return (
    <div className="App">
      <NavigationBar />
      <Routes>
        <Route path="/" Component={LandingPage} />
      </Routes>
    </div>
  );
}

export default App;
