import "./Main.css";
import { assets } from "./assets/assets";

function Main() {
  return (
    <div className="main-container">
      <nav onClick={() => {window.close()}} className="main-navbar-close">
        <img
          className="main-navbar-cross-icon"
          src={assets.cross}
          alt="close"
        />
      </nav>
      <div className="main-icon">
        <img className="main-icon-img" src={assets.icon} alt="chime" />
      </div>
      <div className="main-btns">
        <div className="main-btn-login">
          <p className="main-btn-login-text">Login</p>
        </div>
        <div className="main-btn-register">
          <p className="main-btn-register-text">Register</p>
        </div>
      </div>
    </div>
  );
}

export default Main;
