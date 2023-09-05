const statusCode = require('./statusCodes');
const { messageWrongRequest } = require('../utils/messagesErrors');

class BadRequestError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.badRequest;
    this.message = `${messageWrongRequest} ${message}`;
  }
}

module.exports = BadRequestError;
