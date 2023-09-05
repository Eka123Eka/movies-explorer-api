const statusCode = require('./statusCodes');
const { messageConflictRequest } = require('../utils/messagesErrors');

class ConflictError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.conflict;
    this.message = `${messageConflictRequest} ${message}`;
  }
}

module.exports = ConflictError;
