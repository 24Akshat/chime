import "./UI.css";
import { assets } from "./assets/assets";

function UI({ setPage }) {
  return (
    <div className="ui-container">
      <nav className="ui-navbar">
        <img
          onClick={() => {
            setPage("main");
          }}
          className="ui-navbar-logout-icon"
          src={assets.logout}
          alt="logout"
        />
        <div className="ui-navbar-add">ADD NEW CONNECTION</div>
        <img
          onClick={() => {
            window.close();
          }}
          className="ui-navbar-cross-icon"
          src={assets.cross}
          alt="close"
        />
      </nav>
      <div className="ui-main">
        <div className="ui-main-connections">
          <div className="ui-main-connection-requests"></div>
          <div className="ui-main-connection-list"></div>
        </div>
        <div className="ui-main-chat">
          <div className="ui-main-chat-receiver"></div>
          <div className="ui-main-chat-data">
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
            <div className="data">hello</div>
          </div>
          <div className="ui-main-chat-send-fields"></div>
        </div>
      </div>
    </div>
  );
}

export default UI;
