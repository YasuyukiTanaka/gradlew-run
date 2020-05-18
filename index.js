const core = require('@actions/core');
const github = require('@actions/github');
const fs = require('fs');
const path = require('path');
const process = require('process');
const util = require('util');
const exec = util.promisify(require('child_process').exec)


async function lsExample() {
  try {
    const { stdout, stderr } = await exec('ls');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

async function pwdExample() {
  try {
    const { stdout, stderr } = await exec('pwd');
    console.log('stdout:', stdout);
    console.log('stderr:', stderr);
  } catch (e) {
    console.error(e); // should contain code (exit code) and signal (that caused the termination).
  }
}

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
 
  var dirname = path.dirname(workingDirectory);
  //console.log(`dirname is ${dirname}`);
  fs.statSync(dirname);
  // fs.statSync(workingDirectory);
  console.log("process.cwd() = " + process.cwd());
  process.chdir(dirname);
  consloe.log(dirname);
  console.log("process.cwd() = " + process.cwd());
  lsExample();
  
  pwdExample();
  gradlewExecute(task);
  //const { stdout, stderr } = (async () => { await exec(`./gradlew ${task}`); })()
  // const { stdout, stderr } = await exec(`./gradlew ${shadowjar}`);  
  //console.log(`stdout: ${stdout}`);
  //console.log(`stderr: ${stderr}`);
  //const time = (new Date()).toTimeString();
  //core.setOutput("time", time);
  // Get the JSON webhook payload for the event that triggered the workflow
  //const payload = JSON.stringify(github.context.payload, undefined, 2)
  //console.log(`The event payload: ${payload}`);
} catch (error) {
  core.setFailed(error.message);
}
