const spawn = require('child_process').spawn;

require('dotenv').config();

let logger;
let running;
const streams = [];

const stop = () => {
  running = false;
  streams.forEach(stream => stream.vlc.kill());
};

const run = (url) => {
  if (running) {
    stop();
  }
  setTimeout(() => {
    const stream = {
      url: url,
      vlc: spawn(process.env.vlc, [url, '-I dummy'])
    };
    running = true;
    stream.on('close', (code, signal) => {
      logger.info(`received ${signal} - radio stopped`);
    });
    streams.push(stream);
  }, 100);
};

const current = () => (streams.length > 0 ? streams[0].url : '');

const factory = (log) => {
  logger = log;
  return {
    current: current,
    run: run,
    stop: stop
  };
};

module.exports = factory;
