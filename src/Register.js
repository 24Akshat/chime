import "./Register.css";
import { assets } from "./assets/assets";
import { useState } from "react";

function Register({ setPage }) {
  const [passwHide, setPassHide] = useState(true);
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
          <p className="register-form-username-text">USERNAME</p>
          <input
            className="register-form-username-input"
            type="text"
            placeholder="USERNAME"
          />
        </div>
        <div className="register-form-password">
          <p className="register-form-password-text">PASSWORD</p>
          <div className="register-form-password-fields">
            <input
              className="register-form-password-input"
              type={passwHide ? "password" : "text"}
              placeholder="PASSWORD"
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
        <div className="register-form-submit-btn">
          <p className="register-form-submit-text">SUBMIT</p>
        </div>
      </div>
    </div>
  );
}

export default Register;
