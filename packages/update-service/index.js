const express = require("express");
const gitServicePackage = require("./package.json");
const simpleGit = require("simple-git");
const { execSync } = require("child_process");
require("dotenv").config();

const { TOKEN, USERNAME, TARGET_DIR, CURRENT_BRANCH } = process.env;
const BRANCH = CURRENT_BRANCH || "develop";
const PORT = 3001;

console.log(`target dir: ${TARGET_DIR}`);

const app = express();
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
  let isReady = false;
  app.get("/health", (_req, res) => {
    console.log(`healthcheck isReady: ${isReady}`);

    if (isReady) {
      res.send("ok");
    } else {
      res.status(500).send();
    }
    console.log("all done");
  });

  if (!isGitRepo(TARGET_DIR)) {
    console.log(`cloning to target dir ${TARGET_DIR}`);
    await git.clone(REPO, TARGET_DIR, { "--depth": 1 });
    bootstrap(TARGET_DIR);
  } else {
    console.log(`${TARGET_DIR} is already a git repo. Do git pull instead`);
    await git.pull("origin", BRANCH, {
      "--no-rebase": null,
    });
  }
  isReady = true;

  app.get("/", async (_req, res) => {
    try {
      console.log("updating repo");
      await git.pull("origin", BRANCH, {
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

  const server = app.listen(PORT, () => {
    console.log(
      `api v. ${gitServicePackage.version} listening at http://localhost:${PORT}`
    );
  });

  const shutdown = () => {
    server.close(() => {
      console.log("shutting down updater service");
      process.exit(0);
    });
  };

  process.on("SIGTERM", () => {
    shutdown();
  });
  process.on("SIGINT", () => {
    shutdown();
  });
})();
