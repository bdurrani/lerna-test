console.log("hi");
const packageData = require("./package.json");

module.exports = () => {
  console.log(`package b version ${packageData.version}`);
};
