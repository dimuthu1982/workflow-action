const core = require("@actions/core");
const github = require("@actions/github");
var execSync = require('child_process').execSync;


try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("repository");
  console.log(`Hello V1`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);

var options = {
  encoding: 'utf8'
};
  
let pastWorkflows = execSync('gh run list --repo ${repository} --json name,number,createdAt --limit 10');
console.log(`pastWorkflows: ${pastWorkflows}`);
const lastDate = new Date();
lastDate.setDate(lastDate.getDate() - 30);
console.log("Last Day:" + lastDate.toLocaleDateString());

for (workFlow of pastWorkflows) {
  const createdAt = new Date(workFlow.createdAt);

  if(lastDate.getTime() > createdAt.getTime) {
    console.log("Deleting")
  } else {
    console.log(`Skip [name: ${workFlow.name}, Created: ${workFlow.createdAt}, Number: ${workFlow.number}]`)
  }
} catch (error) {
  core.setFailed(error.message);
}
