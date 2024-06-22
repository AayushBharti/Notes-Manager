const express = require("express");
const app = express();
const path = require("path");
const fs = require("fs");

app.set("view engine", "ejs");
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static(path.join(__dirname, "public")));
//declare all static files are in public

app.get("/", (req, res) => {
  fs.readdir(`./files`, (err, files) => {
    // console.log(files)
    res.render("index");
  });
});

app.listen(3000, () => {
  console.log("server started");
});
