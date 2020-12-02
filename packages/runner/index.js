"use strict";
const intervalMs = 1000;
const runnerPackage = require("./package.json");
const packageB = require("@bdurrani/package-b");

setInterval(() => {
  console.log(`Running job111. Version ${runnerPackage.version}`);
  packageB();
}, intervalMs);

process.once("SIGUSR2", () => {
  console.log("nodemon restart");
  process.exit(0);
});
