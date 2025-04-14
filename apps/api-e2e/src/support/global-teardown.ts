/* eslint-disable */
import { ChildProcess } from 'child_process';

module.exports = async function () {
  // Put clean up logic here (e.g. stopping services, docker-compose, etc.).
  // Hint: `globalThis` is shared between setup and teardown.
  console.log(globalThis.__TEARDOWN_MESSAGE__);

  // Kill the API server process
  const apiProcess = globalThis.__API_PROCESS__ as ChildProcess;
  if (apiProcess) {
    if (process.platform === 'win32') {
      // Windows requires a different approach to kill the process tree
      require('child_process').exec(`taskkill /pid ${apiProcess.pid} /T /F`);
    } else {
      // On Unix-like systems, negative PID kills the process group
      process.kill(-apiProcess.pid, 'SIGTERM');
    }
  }
};
