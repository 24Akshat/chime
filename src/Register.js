import "./Register.css";
import { assets } from "./assets/assets";
import { useState } from "react";

function Register({ setPage }) {
  const [passwHide, setPassHide] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameEmpt, setUsernameEmpt] = useState(false);
  const [passwEmpt, setPasswEmpt] = useState(false);
  const [usernameExists, setUsernameExistence] = useState(false);
  const [success, setSuccess] = useState(false);
  const handleRegisterSubmit = async () => {
    if (username === "" && password === "") {
      setUsernameEmpt(true);
      setPasswEmpt(true);
      return;
    }
    if (password === "") {
      setPasswEmpt(true);
      return;
    } else if (username === "") {
      setUsernameEmpt(true);
      return;
    }
    const data = {
      username: username,
      password: password,
    };
    const res = await fetch("http://localhost:8000/register", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (res.status === 401) {
      setUsernameExistence(true);
      return;
    }
    setSuccess(true);
    setTimeout(() => {
      setPage("login");
    }, 1500);
  };
  return (
    <div className="register-container">
      <nav className="register-navbar">
        <img
          onClick={() => {
            setPage("main");
          }}
          className="login-navbar-back-icon"
          src={assets.back}
          alt="back"
        />
        <p className="register-navbar-text">REGISTER</p>
        <img
          onClick={() => {
            window.close();
          }}
          className="register-navbar-cross-icon"
          src={assets.cross}
          alt="close"
        />
      </nav>
      <div className="register-icon">
        <img className="register-icon-img" src={assets.icon} alt="chime" />
      </div>
      <div className="register-form">
        <div className="register-form-username">
          <p className="register-form-username-text">
            USERNAME {!usernameEmpt ? "" : "(FILL THE FIELD)"}{" "}
            {!usernameExists ? "" : "(ALREADY IN USE)"}
          </p>
          <input
            className={
              !usernameEmpt
                ? "register-form-username-input"
                : "register-form-username-input-empty"
            }
            type="text"
            placeholder="USERNAME"
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameEmpt(false);
              setUsernameExistence(false);
            }}
          />
        </div>
        <div className="register-form-password">
          <p className="register-form-password-text">
            PASSWORD {!passwEmpt ? "" : "(FILL THE FIELD)"}
          </p>
          <div className="register-form-password-fields">
            <input
              className={
                !passwEmpt
                  ? "register-form-password-input"
                  : "register-form-password-input-empty"
              }
              type={passwHide ? "password" : "text"}
              placeholder="PASSWORD"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswEmpt(false);
              }}
            />
            <img
              className={
                passwHide
                  ? "register-form-password-hide"
                  : "register-form-password-show"
              }
              src={passwHide ? assets.eyesClose : assets.eyesOpen}
              alt={passwHide ? "Show" : "Hide"}
              onClick={() => {
                setPassHide(!passwHide);
              }}
            />
          </div>
        </div>
        <div
          onClick={() => {
            handleRegisterSubmit();
          }}
          className={
            success ? "register-form-success-btn" : "register-form-submit-btn"
          }
        >
          <p
            className={
              success
                ? "register-form-success-text"
                : "register-form-submit-text"
            }
          >
            {success ? "SUCCESS" : "SUBMIT"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Register;
