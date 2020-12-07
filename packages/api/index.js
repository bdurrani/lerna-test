const express = require("express");
const apiPackage = require("./package.json");
const app = express();
const port = 3000;

function delay(ms) {
  return new Promise((resolve) => {
    setTimeout(resolve, ms);
  });
}

app.get("/", async (_req, res) => {
  const message = `Hello world AMANI WAS HERE. ${apiPackage.version}`;
  await delay(1000);
  res.send(message);
  console.log(`sent: ${message}`);
});

const server = app.listen(port, () => {
  console.log(
    `api v. ${apiPackage.version} listening at http://localhost:${port}`
  );
});

process.once("SIGUSR2", function () {
  console.log("got the kill signal");
  server.close(() => {
    console.log("API GRACEFUL SHUTDOWN VIA NODEMON");
    process.kill(process.pid, "SIGUSR2");
  });
});
