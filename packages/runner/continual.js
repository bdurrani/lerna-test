"use strict";

// const forever = require("forever-monitor");
const nodemon = require("nodemon");

const MAX_RUN_COUNT = 2;

nodemon({
  script: "index.js",
  ext: "js json",
  delay: 2000,
});
let currentCount = 0;
nodemon
  .on("start", function () {
    console.log("App has started");
  })
  .on("exit", function () {
    console.log("App has quit");
    currentCount++;
    nodemon.restart();
    if (currentCount >= MAX_RUN_COUNT) {
      console.log("max restarts");
      process.exit();
    }
  })
  .on("restart", function (files) {
    console.log("App restarted due to: ", files);
    // currentCount++;
  })
  .on("crash", function (files) {
    console.log("App crashed");
    currentCount++;
  });

// const child = new forever.Monitor("index.js", {
//   max: MAX_RUN_COUNT,
// });

// child.on("restart", () => {
//   console.log(`Forever restart count: ${child.times}`);
// });

// child.on("exit:code", (code) => {
//   console.log(`Forever detected robot-runner exited with code ${code}`);
// });

// child.on("exit", () => {
//   console.log("Scheduled runner going to die now");
// });

// child.start();
