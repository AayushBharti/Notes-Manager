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
    res.render("index", { files: files });
  });
});

app.get("/file/:fileName", (req, res) => {
  fs.readFile(`./files/${req.params.fileName}`, "utf-8", (err, fileData) => {
    res.render("show", {
      fileName: req.params.fileName,
      fileData: fileData,
    });
  });
});

app.get("/edit/:fileName", (req, res) => {
  res.render("edit", {
    fileName: req.params.fileName,
  });
});

app.post("/create", (req, res) => {
  //   console.log(req.body);
  fs.writeFile(
    `./files/${req.body.title.split(" ").join("")}.txt`,
    req.body.details,
    (err) => {
      console.log(err);
    }
  );
});

app.post("/edit", (req, res) => {
  console.log(req.body);
  fs.rename(
    `./files/${req.body.previous}`,
    `./files/${req.body.new}`,
    (err) => {
      res.redirect("/");
    }
  );
});

app.listen(3000, () => {
  console.log("server started");
});
