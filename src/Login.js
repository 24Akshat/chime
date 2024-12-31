import { useState } from "react";
import "./Login.css";
import { assets } from "./assets/assets";

function Login({setPage}) {
  const [passwHide, setPassHide] = useState(true);
  return (
    <div className="login-container">
      <nav className="login-navbar">
        <img
          onClick={() => {
            setPage('main');
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
          <p className="login-form-username-text">USERNAME</p>
          <input
            className="login-form-username-input"
            type="text"
            placeholder="USERNAME"
          />
        </div>
        <div className="login-form-password">
          <p className="login-form-password-text">PASSWORD</p>
          <div className="login-form-password-fields">
            <input
              className="login-form-password-input"
              type={passwHide ? "password" : "text"}
              placeholder="PASSWORD"
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
        <div className="login-form-submit-btn">
          <p className="login-form-submit-text">SUBMIT</p>
        </div>
      </div>
    </div>
  );
}

export default Login;
