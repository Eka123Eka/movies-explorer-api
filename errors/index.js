const BadRequestError = require('./bad-request-errors');
const ForbiddenError = require('./forbidden-errors');
const NotFoundError = require('./not-found-errors');
const AuthError = require('./auth-errors');
const ConflictError = require('./conflict-errors');
const statusCode = require('./statusCodes');

module.exports = {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
  AuthError,
  ConflictError,
  statusCode,
};
