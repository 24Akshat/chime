import Main from "./Main";
import Login from "./Login";
import Register from "./Register";
import UI from "./UI";
import "./App.css";
import { useState } from "react";

function App() {
  const [page, setPage] = useState("main");
  return (
    <div className="App">
      {page === "main" ? (
        <Main setPage={setPage} />
      ) : page === "login" ? (
        <Login setPage={setPage} />
      ) : page === "register" ? (
        <Register setPage={setPage} />
      ) : (
        <UI setPage={setPage} />
      )}
    </div>
  );
}

export default App;
