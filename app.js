const express = require('express');
const path = require('path');
const cookieParser = require('cookie-parser');
const logger = require('winston');
const helmet = require('helmet');
const cors = require('cors');
const compression = require('compression');
const fs = require('fs');
const yaml = require('js-yaml');
const swaggerUi = require('swagger-ui-express');

const indexRouter = require('./routes/index');
const secretsRouter = require('./routes/secrets');
const remarksRouter = require('./routes/remarks');
const filesRouter = require('./routes/files');
const authRouter = require('./routes/auth');
const dbRouter = require('./routes/database');
const restrictedRouter = require('./routes/restricted');
const validateRouter = require('./routes/validate');

const app = express();
logger.add(new logger.transports.Console());

const swaggerDocument = fs.readFileSync('./swagger.yaml', { encoding: 'utf-8' });
const swaggerSetup = swaggerUi.setup(yaml.load(swaggerDocument));

app.use(compression());
app.use(cors());
app.use(helmet());
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(cookieParser());
app.use(express.static(path.join(__dirname, 'public')));

app.use('/', indexRouter);
app.use('/auth', authRouter);
app.use('/secrets', secretsRouter);
app.use('/remarks', remarksRouter);
app.use('/files', filesRouter);
app.use('/database', dbRouter);
app.use('/restricted', restrictedRouter);
app.use('/validate', validateRouter);
app.use('/api-docs', swaggerUi.serve, swaggerSetup);

app.use((err, req, res, next) => {
  logger.error(err.message);
  res.status(500);
  res.sendFile(`${__dirname}/public/error.html`);
});

module.exports = app;
