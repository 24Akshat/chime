const express = require("express");
const mongoose = require("mongoose");
const cors = require("cors");
const PORT = 8000;
const app = express();

//Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(cors());

//Routes
app.route("/register").post((req, res) => {
  const data = req.body;
  console.log(data);
  res.status(200).json({ status: "received" });
});

app.listen(PORT, () => {
  console.log(`SERVER STARTED AT PORT: ${PORT}`);
});
