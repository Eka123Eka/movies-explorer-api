const express = require('express');
const mongoose = require('mongoose');
const helmet = require('helmet');
const { errors } = require('celebrate');
const cors = require('cors');
const handleError = require('./middlewares/handle-errors');
const { PORT, SERVER_ADR, DB_URL } = require('./utils/constants');
const { limiter } = require('./middlewares/limiters');

const { requestLogger, errorLogger } = require('./middlewares/logger');

const routes = require('./routes');

mongoose.connect(DB_URL, {
  useNewUrlParser: true,
}).then(() => console.log(new Date(Date.now()).toString(), 'connected to db:', mongoose.connections[0].name));

const app = express();

app.use(helmet());
app.use(requestLogger);
app.use(limiter);
app.use(express.json());
app.use(cors({ origin: true, credentials: true }));

app.use(routes);
app.use(errorLogger);
app.use(errors());
app.use(handleError);

app.listen(PORT, () => {
  console.log(new Date(Date.now()).toString(), `server is running at ${SERVER_ADR}:${PORT}`);
});
