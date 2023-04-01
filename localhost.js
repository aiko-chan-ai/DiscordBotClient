const express = require("express");
const fs = require("fs");
const http = require("https");
require('./arRPC/src/index.js');

const port = 2023;

const { platform } = require('os');
const { exec } = require('child_process');

const WINDOWS_PLATFORM = 'win32';
const MAC_PLATFORM = 'darwin';
const ANDROID_PLATFORM = 'android';
const LINUX_PLATFORM = 'linux';

const osPlatform = platform();


const httpsOptions = {
  key: fs.readFileSync('./security/key.pem', "utf-8"),
  cert: fs.readFileSync('./security/cert.pem', "utf-8")
}

const app = express();

app.use('*', async (req, res, next) => {
	res.setHeader('access-control-allow-origin', '*');
	next();
});

require('./handler')(app);

http.createServer(httpsOptions, app)
  .listen(port, () => {
    console.log('Server running at ' + port);
    try {
      let command;
      const url = 'https://127.0.0.1:' + port;

      switch (osPlatform) {
        case WINDOWS_PLATFORM:
          command = `start ${url}`;
          break;
        case MAC_PLATFORM:
          command = `open -a "Google Chrome" ${url}`;
          break;
        case ANDROID_PLATFORM:
          command = `xdg-open ${url}`;
          break;
        case LINUX_PLATFORM:
          command = `firefox ${url}`;
          break;
        default:
          command = `google-chrome --no-sandbox ${url}`;
          break;
      }

      console.log(`Executing command: ${command}`);
      exec(command);
    } catch {
      console.log('Failed to open browser');
    }
  });

// Catch unhandled promise rejections
process.on('unhandledRejection', (err) => {
  console.error(err);
});

// Catch uncaught exceptions
process.on('uncaughtException', (err) => {
  console.error(err);
});
