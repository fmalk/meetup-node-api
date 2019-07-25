require('dotenv').config();
const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('winston');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');

const app = express();
logger.add(new logger.transports.Console());

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));
// Rotas de API aqui
app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500);
  res.sendFile(`${__dirname}/public/error.html`);
});

module.exports = app;
