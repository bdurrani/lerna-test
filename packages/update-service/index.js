const express = require("express");
const gitServicePackage = require("./package.json");
const simpleGit = require("simple-git");

const app = express();
const port = 3001;
const branch = "master";
const git = simpleGit();
const REPO = "https://github.com/bdurrani/lerna-test.git";

(async () => {
  await git.clone(REPO, "");
})();

app.get("/", async (_req, res) => {
  try {
    await git.pull("origin", branch, { "--no-rebase": null });
    const status = await git.status();
    res.send(status);
  } catch (error) {
    res.status(500);
    res.send("error");
  }
});

app.listen(port, () => {
  console.log(
    `api v. ${gitServicePackage.version} listening at http://localhost:${port}`
  );
});
