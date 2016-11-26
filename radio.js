const exec = require('child_process').exec;

let logger;
let vlc;

const run = (url) => {
  vlc = exec(`vlc ${url} -I dummy`, (error) => {
    if (error) {
      logger.error(`exec error: ${error}`);
    } else {
      logger.info(`stream ${url} started`);
    }
  });
};

const stop = () => {
  if (vlc) {
    vlc.kill();
    logger.info('radio stopped');
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
