const multer = require("multer");
require("dotenv").config();
const File = require("./models/file");
const mongoose = require("mongoose");
const express = require("express");
const app = express();
const port = process.env.PORT;
const upload = multer({ dest: "uploads" });

mongoose.connect(process.env.DATABASE_URL);

app.set("view engine", "ejs");
app.get("/", (req, res) => {
  res.render("index");
});

app.post("/upload", upload.single("file"), async (req, res) => {
  const fileData = {
    path: req.file.path,
    originalName: req.file.originalname,
  };
  if (req.body.password != null && req.body.password != "") {
    fileData.password = await bcrypt.hash(req.body.password, 10);
  }
  const file = await File.create(fileData);
  console.log(file);
  res.send(originalName);
});
app.listen(process.env.PORT, () => {
  console.log(`server  connected at port ${port}`);
});
