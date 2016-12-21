const spawn = require('child_process').spawn;

require('dotenv').config();

let logger;
let vlc;
let running;

const stop = () => {
  running = false;
  if (vlc) {
    vlc.kill();
  }
};

const run = (url) => {
  if (running) {
    stop();
  }
  vlc = spawn(process.env.vlc, [url, '-I dummy']);
  running = true;
  vlc.on('close', (code, signal) => {
    logger.info(`received ${signal} - radio stopped`);
  });
};

const factory = (log) => {
  logger = log;
  return {
    run: run,
    stop: stop
  };
};

module.exports = factory;
