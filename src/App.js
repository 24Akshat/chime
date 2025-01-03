import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import UI from "./UI";
import "./App.css";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("main");
  const [username, setUsername] = useState("");
  return (
    <div className="App">
      {page === "main" ? (
        <Main setPage={setPage} />
      ) : page === "login" ? (
        <Login setPage={setPage} setUserName={setUsername} />
      ) : page === "register" ? (
        <Register setPage={setPage} />
      ) : (
        <UI setPage={setPage} username={username} />
      )}
      {/* <UI setPage={setPage} username={username} /> */}
    </div>
  );
}

export default App;
