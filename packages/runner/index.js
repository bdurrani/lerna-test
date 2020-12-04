"use strict";
const runnerPackage = require("./package.json");
const packageB = require("@bdurrani/package-b");
const axios = require("axios");

const { API_HOST } = process.env;
const intervalMs = 2000;
const api_host = API_HOST || "http://localhost:3000/";
let count = 0;
console.log("starting runner");

setInterval(async () => {
  console.log(`Running job6661. Version ${runnerPackage.version}`);
  packageB();
  count++;
  try {
    console.log(`connecting to ${api_host}`);
    const { data } = await axios.get(api_host);
    console.log(`response: ${data}`);
  } catch (error) {
    console.error(error);
  }
  if (count >= 6) {
    console.log("job done");
    process.exit(0);
  }
}, intervalMs);
