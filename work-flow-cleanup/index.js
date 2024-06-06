const core = require("@actions/core");
const github = require("@actions/github");
var execSync = require("child_process").execSync;

try {
  const repository = core.getInput("repository");
  const time = new Date().toTimeString();
  core.setOutput("time", time);

  console.log("Repo: ${repository}");

  let pastWorkflows = execSync(
    "gh run list --repo ${repository} --json name,number,createdAt --limit 10"
  );
  
  const lastDate = new Date();
  lastDate.setDate(lastDate.getDate() - 30);
  console.log("Last Day:" + lastDate.toLocaleDateString());

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
