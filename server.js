const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const jwt = require("jsonwebtoken");
const PORT = 8000;
const app = express();

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
});

const User = mongoose.model("user", userSchema);

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
    User.create({ username: username, password: password });
  }
  res.status(200).json({ status: "received" });
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT: ${PORT}`);
});
