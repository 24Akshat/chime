import { useEffect, useState } from "react";
import "./UI.css";
import { assets } from "./assets/assets";
import { io } from "socket.io-client";

function UI({ setPage, username }) {
  const [receiverSelected, setReceiverSelection] = useState(false);
  const [selectedUsername, setSelectedUsername] = useState("");
  const [selectedId, setSelectedId] = useState(null);
  const [addNew, setAddNew] = useState(false);
  const [reqUsername, setUsername] = useState("");
  const [reqUsernameEmpt, setEmpt] = useState(false);
  const [reqUserFound, setFound] = useState(true);
  const [newSuccess, setNewSuccess] = useState(false);
  const [requestPage, setReqPage] = useState(false);
  const [reqArray, setReqArr] = useState([]);
  const [connectionsArray, setConArray] = useState([]);
  const [message, setMessage] = useState("");
  const [socket, setSocket] = useState(null);
  const [room, setRoom] = useState("");
  const [messages, setMessagesArray] = useState([]);

  useEffect(() => {
    const socket = io("http://localhost:8000");
    setSocket(socket);
    socket.emit("username", username);
    socket.on("joinRoom", (room) => {
      console.log("joined room");
    });

    socket.on("message", (message, sender, roomName) => {
      const msg =
        sender === username
          ? { direction: "from", message: message, room: roomName }
          : { direction: "to", message: message, room: roomName };
      console.log(msg.room);
      console.log(room);
      setMessagesArray((prevMessages) => [...prevMessages, msg]);
    });
    const fetchData = async () => {
      const data = { username: username };
      const res = await fetch("http://localhost:8000/get-connections", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(data),
      });
      const response = await res.json();
      response.map((data) => {
        socket.emit("joinRoom", username, data);
      });
      setConArray(response);
    };
    fetchData();
    return () => {
      socket.disconnect();
    };
  }, [username]);
  const sendMsg = () => {
    const room = [selectedUsername, username].sort().join("_");
    socket.emit("messageToUser", message, room, username, selectedUsername);
    setMessage("");
  };
  const joinRoom = () => {
    socket.emit("joinRoom", room, username, selectedUsername);
  };
  const handleReqClick = async () => {
    const data = { username: username };
    const res = await fetch("http://localhost:8000/get-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const response = await res.json();
    setReqArr(response);
  };
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
    const requests = await fetch("http://localhost:8000/get-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const req = await requests.json();
    console.log(req);
    setTimeout(() => {
      setNewSuccess(false);
      setAddNew(false);
    }, 1000);
    return;
  };
  const handleAddCon = async (user) => {
    const data = { username: user, ownerUsername: username };
    await fetch("http://localhost:8000/add-connection", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const conns = await fetch("http://localhost:8000/get-connections", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
    const con = await conns.json();
    setConArray(con);
    const reqs = await fetch("http://localhost:8000/get-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
    const req = await reqs.json();
    setReqArr(req);
  };
  const removeRequest = async (user) => {
    const data = { usernameDel: user, ownerUser: username };
    await fetch("http://localhost:8000/remove-request", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(data),
    });
    const newReqs = await fetch("http://localhost:8000/get-requests", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username: username }),
    });
    const newReq = await newReqs.json();
    setReqArr(newReq);
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
      {requestPage ? (
        <div className="ui-container-main-requests">
          <div className="ui-container-main-requests-head">
            <p className="heading">REQUESTS</p>
            <img
              onClick={() => {
                setReqPage(false);
              }}
              className="ui-container-main-requests-close"
              src={assets.cross}
              alt="close"
            />
            <div className="ui-container-main-requests-elem">
              {reqArray.map((data, key) => (
                <div id={key} className="ui-container-main-requests-list">
                  {data}
                  <img
                    className="accept-req"
                    src={assets.add}
                    alt="accept"
                    onClick={() => {
                      handleAddCon(data);
                    }}
                  />{" "}
                  <img
                    className="decline-req"
                    src={assets.remove}
                    alt="decline"
                    onClick={() => {
                      removeRequest(data);
                    }}
                  />
                </div>
              ))}
            </div>
          </div>
        </div>
      ) : (
        <></>
      )}
      <nav className="ui-navbar">
        <img
          onClick={() => {
            // localStorage.removeItem("userToken");
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
          <div
            onClick={() => {
              setReqPage(true);
              handleReqClick();
            }}
            className="ui-main-connection-requests"
          >
            REQUESTS
          </div>
          <div className="ui-main-connection-list">
            {connectionsArray.map((data, key) => (
              <div
                id={key}
                onClick={() => {
                  if (selectedUsername === data) {
                    setReceiverSelection(false);
                    setSelectedId(null);
                    setSelectedUsername("");
                    setRoom("");
                  } else {
                    setReceiverSelection(true);
                    setSelectedUsername(data);
                    setRoom(`${[selectedUsername, username].sort().join("_")}`);
                    setSelectedId(key);
                    joinRoom();
                  }
                }}
                className={selectedId === key ? "selected-contact" : "contact"}
              >
                {data}
              </div>
            ))}
          </div>
        </div>
        <div className="ui-main-chat">
          {receiverSelected ? (
            <>
              {" "}
              <div className="ui-main-chat-receiver">
                <p className="ui-main-chat-receiver-name">{selectedUsername}</p>
              </div>
              <div className="ui-main-chat-data">
                {messages.map((data) => (
                  <div
                    className={data.direction === "from" ? "data-send" : "data"}
                  >
                    {data.room !== room ? data.message : ""}
                  </div>
                ))}
              </div>
              <div className="ui-main-chat-send-fields">
                <input
                  className="ui-main-chat-send-fields-input"
                  type="text"
                  placeholder="TYPE YOUR MESSAGE HERE..."
                  value={message}
                  onChange={(e) => {
                    setMessage(e.target.value);
                  }}
                />
                <img
                  src={assets.send}
                  className="ui-main-chat-send-fields-icon"
                  alt="send"
                  onClick={() => {
                    sendMsg();
                  }}
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
