const express = require('express');
const expressLogging = require('express-logging');
const isUrl = require('is-url');
const logger = require('logops');
const readBody = require('express-readbody');

const radio = require('./radio')(logger);

const app = express();

app.use(expressLogging(logger));

app.put('/start', (req, res) => {
  readBody(req).then(body => {
    const url = JSON.parse(body).url;
    if (isUrl(url)) {
      radio.run(url);
      res.sendStatus(200);
    } else {
      res.sendStatus(500);
    }
  }).catch(err => {
    logger.error(new Error(err));
    res.sendStatus(500);
  });
});

app.put('/stop', (req, res) => {
  radio.stop();
  res.sendStatus(200);
});

app.get('/current', (req, res) => {
  res.status(200).json({ url: radio.current() });
});

app.get('/running', (req, res) => {
  res.status(200).json(radio.running());
});

app.listen(3000);
