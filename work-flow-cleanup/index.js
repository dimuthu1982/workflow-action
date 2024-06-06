const core = require("@actions/core");
const github = require("@actions/github");
const exec = require("child_process").exec;


try {
  // `who-to-greet` input defined in action metadata file
  const nameToGreet = core.getInput("who-to-greet");
  console.log(`Hello ${nameToGreet}!`);
  const time = new Date().toTimeString();
  core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  const payload = JSON.stringify(github.context.payload, undefined, 2);
  //console.log(`The event payload: ${payload}`);


const { stdout, stderr } = await exec("gh run list --repo dimuthu1982/auto-tag-workflow-testing --json name,number --limit 1");

  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);

} catch (error) {
  core.setFailed(error.message);
}
