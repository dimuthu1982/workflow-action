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
  console.log(
    `Retaining Workflows Created Onwords: ${lastDate.toLocaleDateString(
      "en-AU"
    )}`
  );
//gh run list --jq ' .[]| select(.createdAt < (now-( 30 * 86400) | strftime("%Y-%m-%dT%H-%M-%SZ") ))' --json conclusion,databaseId,createdAt --repo dimuthu1982/auto-tag-workflow-testing
  var hasObsoleteWorkflows = false;
  const retenctionDate = "2024-06-05"
  do {

    let pastWorkflowsString = execSync(`gh run list --repo ${repositoryPath} --jq ' .[]| select(.createdAt < ${retenctionDate})' --json name,databaseId,createdAt --limit 50`);

    const pastWorkflows = JSON.parse(pastWorkflowsString);

    for (workFlow of pastWorkflows) {
      const createdAt = new Date(workFlow.createdAt);

      if (lastDate.getTime() > createdAt.getTime()) {
        console.log(`Deleting [name: ${workFlow.name}, Created: ${lastDate.toLocaleDateString("en-AU")}, DB ID: ${workFlow.databaseId}]`);
        //execSync(`gh run delete --repo ${repositoryPath} ${workFlow.databaseId}`);
        hasObsoleteWorkflows = true;
      } else {
        console.log(`Skip [name: ${workFlow.name}, Created: ${lastDate.toLocaleDateString("en-AU")}, DB ID: ${workFlow.databaseId}]`);
      }
    }
  } while (hasObsoleteWorkflows);

} catch (error) {
  core.setFailed(error.message);
}
