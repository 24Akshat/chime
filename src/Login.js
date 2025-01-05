import { useState } from "react";
import "./Login.css";
import { assets } from "./assets/assets";

function Login({ setPage, setUserName }) {
  const [passwHide, setPassHide] = useState(true);
  const [username, setUsername] = useState("");
  const [password, setPassword] = useState("");
  const [usernameEmpt, setUsernameEmpt] = useState(false);
  const [passwEmpt, setPasswEmpt] = useState(false);
  const [userFound, setUserFound] = useState(true);
  const [passwStat, setPasswStat] = useState(true);
  const [success, setSuccess] = useState(false);
  const handleLoginSubmit = async () => {
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
    const data = { username: username, password: password };
    const res = await fetch("http://localhost:8000/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const body = await res.json();
    if (res.status === 404) {
      setUserFound(false);
      return;
    } else if (res.status === 401) {
      setPasswStat(false);
      return;
    }
    setSuccess(true);
    setUserName(username);
    setTimeout(() => {
      localStorage.setItem("userToken", body.token);
      setPage("chats");
    }, 1500);
  };
  return (
    <div className="login-container">
      <nav className="login-navbar">
        <img
          onClick={() => {
            setPage("main");
          }}
          className="login-navbar-back-icon"
          src={assets.back}
          alt="back"
        />
        <p className="login-navbar-text">LOGIN</p>
        <img
          onClick={() => {
            window.close();
          }}
          className="login-navbar-cross-icon"
          src={assets.cross}
          alt="close"
        />
      </nav>
      <div className="login-icon">
        <img className="login-icon-img" src={assets.icon} alt="chime" />
      </div>
      <div className="login-form">
        <div className="login-form-username">
          <p className="login-form-username-text">
            USERNAME {!usernameEmpt ? "" : "(FILL THE FIELD)"}{" "}
            {userFound ? "" : "(NOT FOUND)"}
          </p>
          <input
            className={
              !usernameEmpt
                ? "login-form-username-input"
                : "login-form-username-input-empty"
            }
            type="text"
            placeholder="USERNAME"
            onChange={(e) => {
              setUsername(e.target.value);
              setUsernameEmpt(false);
              setUserFound(true);
            }}
          />
        </div>
        <div className="login-form-password">
          <p className="login-form-password-text">
            PASSWORD {!passwEmpt ? "" : "(FILL THE FIELD)"}{" "}
            {passwStat ? "" : "(INCORRECT PASSWORD)"}
          </p>
          <div className="login-form-password-fields">
            <input
              className={
                !passwEmpt
                  ? "login-form-password-input"
                  : "login-form-password-input-empty"
              }
              type={passwHide ? "password" : "text"}
              placeholder="PASSWORD"
              onChange={(e) => {
                setPassword(e.target.value);
                setPasswEmpt(false);
                setPasswStat(true);
              }}
            />
            <img
              className={
                passwHide
                  ? "login-form-password-hide"
                  : "login-form-password-show"
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
            handleLoginSubmit();
          }}
          className={
            success ? "login-form-success-btn" : "login-form-submit-btn"
          }
        >
          <p
            className={
              success ? "login-form-success-text" : "login-form-submit-text"
            }
          >
            {success ? "SUCCESS" : "SUBMIT"}
          </p>
        </div>
      </div>
    </div>
  );
}

export default Login;
