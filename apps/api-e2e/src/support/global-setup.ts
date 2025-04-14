/* eslint-disable */
import { ChildProcess } from 'child_process';

declare global {
  var __TEARDOWN_MESSAGE__: string;
  var __API_PROCESS__: ChildProcess;
}

import { spawn } from 'child_process';
import { join } from 'path';

module.exports = async function () {
  // Start services that that the app needs to run (e.g. database, docker-compose, etc.).
  console.log('\nSetting up...\n');

  // Start the API server
  const apiProcess = spawn(
    'node',
    [join(__dirname, '../../../../dist/apps/api/main.js')],
    {
      stdio: ['ignore', 'pipe', 'pipe'],
      detached: process.platform !== 'win32', // Only detach on non-Windows
    }
  );

  // Listen for ready message or errors
  let isServerReady = false;

  apiProcess.stdout.on('data', (data) => {
    console.log(`API stdout: ${data}`);
    if (data.toString().includes('Listening')) {
      isServerReady = true;
    }
  });

  apiProcess.stderr.on('data', (data) => {
    console.error(`API stderr: ${data}`);
  });

  // Store the process for teardown
  globalThis.__API_PROCESS__ = apiProcess;

  // Wait for the server to start or timeout after 10 seconds
  const timeout = 10000;
  const startTime = Date.now();

  while (!isServerReady && Date.now() - startTime < timeout) {
    await new Promise((resolve) => setTimeout(resolve, 500));
  }

  if (!isServerReady) {
    console.warn(
      'API server did not start in time, proceeding with tests anyway'
    );
  }

  // Hint: Use `globalThis` to pass variables to global teardown.
  globalThis.__TEARDOWN_MESSAGE__ = '\nTearing down...\n';
};
