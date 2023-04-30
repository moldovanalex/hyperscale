import React, { useState } from "react";

import { Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined } from "@ant-design/icons";

import { Auth } from "aws-amplify";

import "./SignUpPage.scss";

export default function SignUpPage(props) {
  const { user } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmedPassword, setConfirmedPassword] = useState("");

  async function onSubmit() {
    try {
      if (password !== confirmedPassword) {
        throw new Error("Passwords do not match");
      } else {
        await Auth.signUp(email, password);
      }

      try {
        const lambdaEndpoint =
          "https://urblpsg6n6bwhgsgz5yzwrvasy0phnwx.lambda-url.eu-west-2.on.aws/";
        const result = await fetch(lambdaEndpoint, {
          headers: {
            "Content-Type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            email: email,
          }),
        });

        console.log("result = ", result);
      } catch (error) {
        console.log("error = ", error);
      }

      message.success("Sign up successful. Log in.", 3);

      setTimeout(() => {
        window.location.reload();
      }, 3000);
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="sign-up-page">
      <div className="sign-up-card">
        <div className="sign-up-card-header">
          <Typography.Title>Sign Up</Typography.Title>
        </div>

        <div className="sign-up-card-body">
          <div className="form-item-wrapper">
            <Typography.Text>Email</Typography.Text>
            <Input
              autoComplete="new-password"
              prefix={<UserOutlined />}
              placeholder="Type your email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          <div>
            <div className="form-item-wrapper">
              <Typography.Text>Password</Typography.Text>
              <Input.Password
                autoComplete="new-password"
                placeholder="Type your password"
                prefix={<LockOutlined />}
                onChange={(event) => setPassword(event.target.value)}
              />
            </div>
          </div>

          <div>
            <div className="form-item-wrapper">
              <Typography.Text>Confirm password</Typography.Text>
              <Input.Password
                autoComplete="new-password"
                placeholder="Verify your password"
                prefix={<LockOutlined />}
                onChange={(event) => setConfirmedPassword(event.target.value)}
              />
            </div>
          </div>

          <div>
            <button
              onClick={async () => await onSubmit()}
              className="on-submit-button"
            >
              Submit
            </button>
          </div>
        </div>
      </div>
      <div className="sign-up-form-glow"></div>
    </div>
  );
}
