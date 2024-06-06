const core = require("@actions/core");
const github = require("@actions/github");
var execSync = require("child_process").execSync;

try {
  const repositoryPath = core.getInput("repo-path");
  const retainingDays = core.getInput("retaining-days");

  console.log(`Repo Path: ${repositoryPath}`);
  console.log(`Retaining Days: ${retainingDays}`);

  let pastWorkflowsString = execSync(
    `gh run list --repo ${repositoryPath} --json name,number,createdAt --limit 20`
  );

  const lastDate = new Date();
  console.log("Today Day 1:" + lastDate);
  console.log("Today Day 2:" + lastDate.toLocaleDateString());

  
  lastDate.setDate(lastDate.getDate() - retainingDays);
  console.log("Last Day 3:" + lastDate);
  console.log("Last Day 4:" + lastDate.toLocaleDateString());

  const pastWorkflows = JSON.parse(pastWorkflowsString);

  for (workFlow of pastWorkflows) {
    const createdAt = new Date(workFlow.createdAt);

    console.log("Data1:" + createdAt);
console.log("Data2:" + createdAt.toLocaleDateString());
    
    if (lastDate.getTime() > createdAt.getTime) {
      console.log(`Deleting [name: ${workFlow.name}, Created: ${workFlow.createdAt}, Number: ${workFlow.number}]`);
    } else {
      console.log(
        `Skip [name: ${workFlow.name}, Created: ${workFlow.createdAt}, Number: ${workFlow.number}]`
      );
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
