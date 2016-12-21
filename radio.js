const spawn = require('child_process').spawn;

require('dotenv').config();

let logger;
let vlc;

const run = (url) => {
  vlc = spawn(process.env.vlc, [url, '-I dummy']);
  vlc.on('close', (code, signal) => {
    logger.info(`received ${signal} - radio stopped`);
  });
};

const stop = () => {
  if (vlc) {
    vlc.kill();
  }
};

const factory = (log) => {
  logger = log;
  return {
    run: run,
    stop: stop
  };
};

module.exports = factory;
