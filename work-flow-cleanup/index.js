const core = require("@actions/core");
const github = require("@actions/github");
var execSync = require("child_process").execSync;

try {
  const repositoryPath = core.getInput("repo-path");
  const retainingDays = core.getInput("retaining-days");

  const lastDate = new Date();
  lastDate.setDate(lastDate.getDate() - retainingDays);
  
  console.log(`Repo Path: ${repositoryPath}`);
  console.log(`Retaining Days: ${retainingDays}`);
  console.log(`Day Onwords: ${lastDate.toLocaleDateString('en-AU')}`);

  let pastWorkflowsString = execSync(
    `gh run list --repo ${repositoryPath} --json name,databaseId,createdAt --limit 60`
  );

  const pastWorkflows = JSON.parse(pastWorkflowsString);

  for (workFlow of pastWorkflows) {
    const createdAt = new Date(workFlow.createdAt).toLocaleDateString('en-AU');

    if (lastDate.getTime() > createdAt.getTime()) {
      console.log(`Deleting [name: ${workFlow.name}, Created: ${createdAt}, DB ID: ${workFlow.databaseId}]`);
      execSync(`gh run delete --repo ${repositoryPath} ${workFlow.databaseId}`)
    } else {
      console.log(
        `Skip [name: ${workFlow.name}, Created: ${workFlow.createdAt}, DB ID: ${workFlow.databaseId}]`
      );
    }
  }
} catch (error) {
  core.setFailed(error.message);
}
