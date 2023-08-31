const statusCode = require('./statusCodes');
const { messageForbidden } = require('../utils/messagesErrors');

class ForbiddenError extends Error {
  constructor(message) {
    super(message);
    this.statusCode = statusCode.forbidden;
    this.message = `${messageForbidden} ${message}`;
  }
}
module.exports = ForbiddenError;
