const statusCode = require('../errors/statusCodes');
const { messageServerError } = require('../utils/messagesErrors');

const handleError = (err, req, res, next) => {
  if (err.statusCode) {
    res.status(err.statusCode).send({
      message: err.message,
    });
  } else {
    res.status(statusCode.serverError).send({
      message: messageServerError,
    });
  }
  next();
};

module.exports = handleError;
