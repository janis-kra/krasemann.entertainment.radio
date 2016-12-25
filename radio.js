const spawn = require('child_process').spawn;

require('dotenv').config();

let logger;
let running = false;
const streams = [];

const stop = () => {
  running = false;
  const stream = streams.pop();
  stream.vlc.kill();
};

const run = (url) => {
  if (running) {
    stop();
  }
  running = true;
  setTimeout(() => {
    const stream = {
      url: url,
      vlc: spawn(process.env.vlc, [url, '-I dummy'])
    };
    stream.vlc.on('close', (code, signal) => {
      logger.info(`received ${signal} - radio stopped`);
    });
    streams.push(stream);
  }, 100);
};

const current = () => (streams.length > 0 ? streams[0].url : '');

const isRunning = () => running;

const factory = (log) => {
  logger = log;
  return {
    current: current,
    run: run,
    running: isRunning,
    stop: stop
  };
};

module.exports = factory;
