const express = require('express');
const expressLogging = require('express-logging');
const logger = require('logops');

const app = express();
app.use(expressLogging(logger));

app.listen(3000);
