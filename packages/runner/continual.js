"use strict";

const forever = require("forever-monitor");
// const nodemon = require("nodemon");

const MAX_RUN_COUNT = 5;

// nodemon({
//   script: "index.js",
//   ext: "js json",
//   delay: 2000,
//   exitcrash: true,
// });
// let currentCount = 0;

// nodemon
//   .on("start", function () {
//     console.log("App has started");
//   })
//   .on("exit", function () {
//     console.log("App has quit");
//     currentCount++;
//     process.exit(0);
//     // setTimeout(() => {
//     //   nodemon.emit("restart");
//     // }, 1000);
//     // if (currentCount >= MAX_RUN_COUNT) {
//     //   console.log("max restarts");
//     //   process.exit(0);
//     // }
//   })
//   .on("restart", (files) => {
//     console.log("App restarted due to: ", files);
//     // currentCount++;
//   })
//   .on("crash", () => {
//     console.log("App crashed");
//     currentCount++;
//     process.exit(0);
//   });

// const child = new forever.Monitor("index.js", {
const child = new forever.Monitor("index.js", {
  max: MAX_RUN_COUNT,
  // command: "nodemon",
});

child.on("restart", () => {
  console.log(`Forever restart count: ${child.times}`);
});

child.on("exit:code", (code) => {
  console.log(`Forever detected runner exited with code ${code}`);
});

child.on("exit", () => {
  console.log("runner going to die now");
});

child.start();
