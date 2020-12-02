const express = require("express");
const gitServicePackage = require("./package.json");
const simpleGit = require("simple-git");
const { execSync } = require("child_process");
const { SIGTERM, SIGINT } = require("constants");
require("dotenv").config();

const { TOKEN, USERNAME, TARGET_DIR } = process.env;

const app = express();
const port = 3001;
const branch = "master";
const git = simpleGit({
  baseDir: TARGET_DIR,
});
const REPO = `https://${USERNAME}:${TOKEN}@github.com/bdurrani/lerna-test.git`;

function isGitRepo(folder) {
  try {
    execSync(`git -C ${folder} rev-parse 2>/dev/null`);
    return true;
  } catch (error) {
    return false;
  }
}

function bootstrap(folder) {
  execSync("npm ci && npx lerna bootstrap", {
    cwd: folder,
  });
}

(async () => {
  if (!isGitRepo(TARGET_DIR)) {
    console.log(`cloning to target dir ${TARGET_DIR}`);
    await git.clone(REPO, TARGET_DIR);
    bootstrap(TARGET_DIR);
  } else {
    console.log(`${TARGET_DIR} is already a git report`);
  }

  app.get("/", async (_req, res) => {
    try {
      console.log("updating repo");
      await git.pull("origin", branch, {
        "--no-rebase": null,
      });
      const status = await git.status();
      bootstrap(TARGET_DIR);
      res.send(status);
    } catch (error) {
      res.status(500);
      res.send(error);
      console.log(`error: ${JSON.stringify(error)}`);
    }
  });

  const server = app.listen(port, () => {
    console.log(
      `api v. ${gitServicePackage.version} listening at http://localhost:${port}`
    );
  });

  const shutdown = () => {
    server.close(() => {
      console.log("shutting down updater service");
      process.exit(0);
    });
  };

  process.on(SIGTERM, () => {
    shutdown();
  });
  process.on(SIGINT, () => {
    shutdown();
  });
})();
