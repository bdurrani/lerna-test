const express = require("express");
const apiPackage = require("./package.json");
const app = express();
const port = 3000;

process.once("SIGUSR2", () => {
  console.log("nodemon api restart");
  process.exit(0);
});

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.get("/", async (_req, res) => {
  const message = `Hello world v. ${apiPackage.version}`;
  await delay(5000);
  res.send(message);
  console.log(`sent: ${message}`);
});

const server = app.listen(port, () => {
  console.log(
    `api 1 v. ${apiPackage.version} listening at http://localhost:${port}`
  );
});

process.once("SIGUSR2", function () {
  server.close(() => {
    console.log("API GRACEFUL SHUTDOWN VIA NODEMON");
    process.kill(process.pid, "SIGUSR2");
  });
});
