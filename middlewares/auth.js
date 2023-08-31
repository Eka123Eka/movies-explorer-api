const jwt = require('jsonwebtoken');
const { AuthError } = require('../errors');

const { JWT_SECRET_KEY } = require('../utils/constants');
const { messageReqAuth } = require('../utils/messagesErrors');

const auth = (req, res, next) => {
  const { authorization } = req.headers;

  if (!authorization || !authorization.startsWith('Bearer ')) {
    throw new AuthError(messageReqAuth);
  }

  const token = authorization.replace('Bearer ', '');

  let payload;

  try {
    payload = jwt.verify(token, JWT_SECRET_KEY);
  } catch (err) {
    next(new AuthError(messageReqAuth));
  }

  req.user = payload;
  next();
};

module.exports = auth;
