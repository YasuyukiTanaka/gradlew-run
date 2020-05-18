const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec)

try {
  // `task` input defined in action metadata file
  const task = core.getInput('task');
  console.log(`task param is ${task}!`);
  
  // `working-directory` input defined in action metadata file
  const workingDirectory = core.getInput('working-directory');
  console.log(`working-directory param is ${workingDirectory}!`);
  
  var dirname = path.dirname(workingDirectory);
  fs.statSync(dirname);
  process.chdir(dirname);
  const { stdout, stderr } = (async () => { await exec(`./gradlew ${shadowjar}`); })()
  // const { stdout, stderr } = await exec(`./gradlew ${shadowjar}`);  
  console.log(`stdout: ${stdout}`);
  console.log(`stderr: ${stderr}`);
  //const time = (new Date()).toTimeString();
  //core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
