const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec)

async function gradlewExecute(task) {
  try {
    const { stdout, stderr } = await exec(`./gradlew ${task}`);
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

try {
  // `task` input defined in action metadata file
  const task = core.getInput('task');
  console.log(`task param is ${task}!`);
  
  // `working-directory` input defined in action metadata file
  const workingDirectory = core.getInput('working-directory');
  console.log(`working-directory param is ${workingDirectory}!`);
 
  fs.statSync(workingDirectory);
  process.chdir(workingDirectory);
  
  gradlewExecute(task);
} catch (error) {
  core.setFailed(error.message);
}
