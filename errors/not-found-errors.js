const statusCode = require('./statusCodes');

class NotFoundError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.pageNotFound;
  }
}

module.exports = NotFoundError;
