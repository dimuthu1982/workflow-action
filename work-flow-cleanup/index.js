const core = require("@actions/core");
const github = require("@actions/github");
var execSync = require("child_process").execSync;

try {
  const repositoryPath = core.getInput("repo-path");
  const time = new Date().toTimeString();
  core.setOutput("time", time);

  console.log(`Repo Path: ${repositoryPath}`);

  let pastWorkflows1 = execSync(
    `gh run list --repo ${repositoryPath} --json name,number,createdAt --limit 10`
  );

  const lastDate = new Date();
  lastDate.setDate(lastDate.getDate() - 30);
  console.log("Last Day:" + lastDate.toLocaleDateString());

  const pastWorkflows = JSON.parse(pastWorkflows1);
  console.log(`pastWorkflows: ${pastWorkflows}`);
  console.log(`pastWorkflows.length: ${pastWorkflows.length}`);

  for (workFlow of pastWorkflows) {
    const createdAt = new Date(workFlow.createdAt);

    if (lastDate.getTime() > createdAt.getTime) {
      console.log("Deleting");
    } else {
      console.log(
        `Skip [name: ${workFlow.name}, Created: ${workFlow.createdAt}, Number: ${workFlow.number}]`
      );
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
