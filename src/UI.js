import { useState } from "react";
import "./UI.css";
import { assets } from "./assets/assets";

function UI({ setPage, username }) {
  const [receiverSelected, setReceiverSelection] = useState(false);
  const [addNew, setAddNew] = useState(false);
  const [reqUsername, setUsername] = useState("");
  const [reqUsernameEmpt, setEmpt] = useState(false);
  const [reqUserFound, setFound] = useState(true);
  const [newSuccess, setNewSuccess] = useState(false);
  const handleConnectSubmit = async () => {
    if (reqUsername === "") {
      setEmpt(true);
      return;
    }
    if (reqUsername === username) {
      return;
    }
    const data = { username: reqUsername, senderUsername: username };
    const res = await fetch("http://localhost:8000/add-new-user", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    if (res.status === 404) {
      setFound(false);
      return;
    }
    setNewSuccess(true);
    setTimeout(() => {
      setNewSuccess(false);
      setAddNew(false);
    }, 1000);
    return;
  };
  return (
    <div className="ui-container">
      {addNew ? (
        <div className="ui-container-main">
          <div className="ui-container-main-add">
            <p>ADD NEW CONNECTION</p>
            <img
              onClick={() => {
                setAddNew(false);
              }}
              className="ui-container-main-close"
              src={assets.cross}
              alt="close"
            />
            <p className="ui-container-main-text">
              USERNAME {reqUsernameEmpt ? "(FILL THE FIELD)" : ""}{" "}
              {reqUserFound ? "" : "(NOT FOUND)"}
            </p>
            <input
              type="text"
              className="ui-container-main-input"
              placeholder="USERNAME"
              onChange={(e) => {
                setUsername(e.target.value);
                setEmpt(false);
                setFound(true);
              }}
            />
            <div
              className={
                !newSuccess
                  ? "ui-container-main-submit"
                  : "ui-container-main-success"
              }
              onClick={() => {
                handleConnectSubmit();
              }}
            >
              {!newSuccess ? "SUBMIT" : "SENT"}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <nav className="ui-navbar">
        <img
          onClick={() => {
            setPage("main");
          }}
          className="ui-navbar-logout-icon"
          src={assets.logout}
          alt="logout"
        />
        <div
          onClick={() => {
            setAddNew(true);
          }}
          className="ui-navbar-add"
        >
          ADD NEW CONNECTION
        </div>
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
          <div className="ui-main-connection-requests">REQUESTS</div>
          <div className="ui-main-connection-list">
            <div
              onClick={() => {
                setReceiverSelection(true);
              }}
              className="contact-selected"
            >
              hello
            </div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
            <div className="contact">hello</div>
          </div>
        </div>
        <div className="ui-main-chat">
          {receiverSelected ? (
            <>
              {" "}
              <div className="ui-main-chat-receiver">
                <p className="ui-main-chat-receiver-name">HELLO</p>
              </div>
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
              <div className="ui-main-chat-send-fields">
                <input
                  className="ui-main-chat-send-fields-input"
                  type="text"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                />
                <img
                  src={assets.send}
                  className="ui-main-chat-send-fields-icon"
                  alt="send"
                />
              </div>
            </>
          ) : (
            <>
              <img
                className="ui-main-chat-icon"
                src={assets.icon}
                alt="chime"
              />
              <p className="ui-main-chat-text">Hey there! Welcome {username}</p>
            </>
          )}
        </div>
      </div>
    </div>
  );
}

export default UI;
