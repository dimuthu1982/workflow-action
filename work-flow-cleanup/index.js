const core = require("@actions/core");
const github = require("@actions/github");
var execSync = require('child_process').execSync;


try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello V1`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);

var options = {
  encoding: 'utf8'
};
  
let pastWorkflows = execSync('gh run list --repo dimuthu1982/auto-tag-workflow-testing --json name,number,createdAt --limit 5');
console.log(`pastWorkflows: ${pastWorkflows}`);
} catch (error) {
  core.setFailed(error.message);
}
