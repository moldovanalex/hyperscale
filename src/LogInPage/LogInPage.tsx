import React, { useState } from "react";
import { Navigate, useNavigate } from "react-router-dom";

import { Input, message, Typography } from "antd";
import { LockOutlined, UserOutlined, SafetyOutlined } from "@ant-design/icons";

import { Auth } from "aws-amplify";

import "./LogInPage.scss";

export default function LogInPage(props) {
  const { user } = props;
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [isResettingPassword, setIsResettingPassword] = useState(false);
  const [verificationCode, setVerificationCode] = useState("");

  if (user) {
    return <Navigate to="/document-processing" replace />;
  }

  async function sendVerificationCode() {
    if (!email) {
      message.error("Please enter your email address.", 3);
      return;
    }

    try {
      await Auth.forgotPassword(email);
    } catch (err) {
      console.log("error = ", err);
    }
  }

  async function setNewUserPassword() {
    try {
      await Auth.forgotPasswordSubmit(email, verificationCode, password);

      message.info("Your password has been reset successfully. Log in.", 3);

      setTimeout(() => {
        resetFields();
      }, 3000);
    } catch (err) {
      console.log(err);
    }
  }

  function resetFields() {
    setIsResettingPassword(false);
    setEmail("");
    setPassword("");
    setVerificationCode("");
  }

  async function onSubmit() {
    try {
      if (isResettingPassword) {
        await setNewUserPassword();
        return;
      }

      await Auth.signIn(email, password);
      window.location.reload();
    } catch (error) {
      console.log(error);
    }
  }

  return (
    <div className="log-in-page">
      <div className="log-in-card">
        <div className="log-in-card-header">
          <Typography.Title>
            {isResettingPassword ? "Reset your password" : "Log in"}
          </Typography.Title>
        </div>

        <div className="log-in-card-body">
          <div className="form-item-wrapper">
            <Typography.Text>Email</Typography.Text>
            <Input
              autoComplete="new-password"
              prefix={<UserOutlined />}
              placeholder="Type your email"
              onChange={(event) => setEmail(event.target.value)}
            />
          </div>

          {isResettingPassword ? (
            <div>
              <div className="form-item-wrapper">
                <Typography.Text>Verification code</Typography.Text>
                <div className="verification-code-wrapper">
                  <Input
                    id="verification-code"
                    autoComplete="off"
                    aria-autocomplete="none"
                    prefix={<SafetyOutlined />}
                    placeholder="Type your code"
                    onChange={(event) =>
                      setVerificationCode(event.target.value)
                    }
                    className="verification-code-input"
                  />
                  <button
                    className="verification-code-button"
                    onClick={async () => await sendVerificationCode()}
                  >
                    Send code
                  </button>
                </div>
              </div>

              <div className="form-item-wrapper">
                <Typography.Text>New Password</Typography.Text>
                <Input.Password
                  autoComplete="new-password"
                  placeholder="Type your new password"
                  prefix={<LockOutlined />}
                  onChange={(event) => setPassword(event.target.value)}
                />
              </div>
            </div>
          ) : (
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

              <Typography.Text>
                Forgot password? Click{" "}
                <div
                  className="reset-password-button"
                  onClick={() => setIsResettingPassword(true)}
                >
                  here
                </div>{" "}
                to reset it.
              </Typography.Text>
            </div>
          )}

          <div>
            <button
              onClick={async () => await onSubmit()}
              className={`on-submit-button ${
                isResettingPassword && "reset-password"
              }`}
            >
              Submit
            </button>
          </div>

          {isResettingPassword && (
            <Typography.Text className="back-to-sign-in-label">
              Back to{" "}
              <div
                className="back-to-sign-in-button"
                onClick={() => setIsResettingPassword(false)}
              >
                sign in
              </div>
            </Typography.Text>
          )}
        </div>
      </div>
      <div className="log-in-form-glow"></div>
    </div>
  );
}
