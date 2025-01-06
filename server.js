const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const http = require("http");
const { Server } = require("socket.io");
const jwt = require("jsonwebtoken");
const PORT = 8000;
const app = express();
const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: [
      "chrome-extension://hegdjjfdeocafkidebghllghkdeaeolj",
      "http://localhost:3000",
    ], // Your frontend URL
    methods: ["GET", "POST"],
  },
});

const SECRET_KEY = "1Rci},.0A.q7wkD^-a#[RwV;hX+j@h`s";

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Database
mongoose.connect("mongodb://127.0.0.1:27017/chimeUsers").then(() => {
  console.log("Database Connected");
});

const userSchema = new mongoose.Schema({
  username: { type: String, required: true },
  password: { type: String, required: true },
  connections: { type: [String] },
  requests: { type: [String] },
  socketid: { type: String },
});

const User = mongoose.model("user", userSchema);

//socket.io connection
io.on("connection", (socket) => {
  console.log("User connected: ", socket.id);
  socket.on("username", async (username) => {
    console.log(username);
    const user = await User.findOne({ username: username });
    user.socketid = socket.id;
    user.save();
  });
  socket.on("messageToUser", async (message, room, owner, rec) => {
    io.to(room).emit("message", `${message}`, owner, room);
  });
  socket.on("joinRoom", async (ownerUser, recUser) => {
    const room = [ownerUser, recUser].sort().join("_");
    console.log("joined room");
    const owner = await User.findOne({ username: ownerUser });
    const rec = await User.findOne({ username: recUser });
    socket.join(room);
    io.to(rec.socketid).emit("joinRoom");
  });
  socket.on("disconnect", () => {
    console.log("user disconnected");
  });
});

//Routes
app.route("/get-requests").post(async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username: username });
  return res.send(user.requests);
});
app.route("/get-connections").post(async (req, res) => {
  const { username } = req.body;
  const user = await User.findOne({ username: username });
  return res.send(user.connections);
});
app.route("/add-connection").post(async (req, res) => {
  const { username, ownerUsername } = req.body;
  const user = await User.findOne({ username: ownerUsername });
  const recUser = await User.findOne({ username: username });
  user.connections.push(username);
  user.requests.pull(username);
  recUser.connections.push(ownerUsername);
  recUser.save();
  user.save();
  return res.status(200).json({ status: "success" });
});
app.route("/add-new-user").post(async (req, res) => {
  const { username, senderUsername } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).json({ username: "not found" });
  }
  user.requests.push(senderUsername);
  user.save();
  return res.status(200).json({ request: "sent" });
});
app.route("/remove-request").post(async (req, res) => {
  const { usernameDel, ownerUser } = req.body;
  const user = await User.findOne({ username: ownerUser });
  user.requests.pull(usernameDel);
  user.save();
  return res.status(200).json({ status: "success" });
});

app.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).json({ username: "not found" });
  }
  if (user.password === password) {
    const token = jwt.sign({ username: username }, SECRET_KEY);
    return res.status(200).json({ status: "successfull", token: token });
  }
  return res.status(401).json({ status: "incorrect password" });
});

app.route("/register").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (user) {
    return res.status(401).json({ username: "already exists" });
  } else {
    User.create({ username: username, password: password, socketid: "" });
  }
  res.status(200).json({ status: "received" });
});

server.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT: ${PORT}`);
});
