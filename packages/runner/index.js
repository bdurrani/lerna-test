"use strict";
const intervalMs = 2000;
const runnerPackage = require("./package.json");
const packageB = require("@bdurrani/package-b");
let count = 0;
console.log("starting runner");

setInterval(() => {
  console.log(`Running job666. Version ${runnerPackage.version}`);
  packageB();
  count++;
  if (count >= 6) {
    console.log("job done");
    process.exit(0);
  }
}, intervalMs);

// process.once("SIGUSR2", () => {
//   console.log("nodemon restart");
//   process.exit(0);
// });
