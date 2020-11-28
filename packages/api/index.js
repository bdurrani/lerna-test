const express = require("express");
const apiPackage = require("./package.json");
const app = express();
const port = 3000;

process.once("SIGUSR2", () => {
  console.log("nodemon api restart");
  process.exit(0);
});

app.get("/", (_req, res) => {
  res.send("Hello World!");
});

app.listen(port, () => {
  console.log(
    `api v. ${apiPackage.version} listening at http://localhost:${port}`
  );
});
