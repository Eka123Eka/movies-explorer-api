const statusCode = require('./statusCodes');

class UnauthorizedError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.badAuth;
  }
}

module.exports = UnauthorizedError;
