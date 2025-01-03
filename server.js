const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;
const app = express();

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

app.route("/login").post(async (req, res) => {
  const { username, password } = req.body;
  const user = await User.findOne({ username: username });
  if (!user) {
    return res.status(404).json({ username: "not found" });
  }
  if (user.password === password) {
    return res.status(200).json({ status: "successfull" });
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
