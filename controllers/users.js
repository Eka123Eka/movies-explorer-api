const bcrypt = require('bcryptjs');
const jwt = require('jsonwebtoken');
const User = require('../models/user');
const { JWT_SECRET_KEY, salt } = require('../utils/constants');
const {
  BadRequestError, ConflictError, NotFoundError, AuthError,
} = require('../errors');

const {
  messageNotFoundUser,
  messageWrongIdUser,
  messageWrongData,
  messageExistEmail,
  messageWrongUpdateData,
  messageWrongAuth,
} = require('../utils/messagesErrors');

const getLoginUser = (req, res, next) => {
  const userId = req.user._id;
  User.findById(userId)
    .orFail(new NotFoundError(`${messageNotFoundUser} ${userId}`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${messageWrongIdUser} ${userId}`));
      } else {
        next(err);
      }
    });
};

const createUser = (req, res, next) => {
  const {
    name, email, password,
  } = req.body;
  bcrypt.hash(password, salt)
    .then((hash) => User.create({
      name, email, password: hash,
    }))
    .then((user) => res.send({
      name: user.name,
      email: user.email,
    }))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${messageWrongData}
        ${Object.values(err.errors).map((e) => e.message).join(', ')}`));
      } else if (err.code === 11000) {
        next(new ConflictError(`${email} ${messageExistEmail}`));
      } else {
        next(err);
      }
    });
};

const updateUser = (req, res, next) => {
  const userId = req.user._id;
  const { name, email } = req.body;

  User.findByIdAndUpdate(userId, { name, email }, { new: true, runValidators: true })
    .orFail(new NotFoundError(`${messageNotFoundUser} ${userId}`))
    .then((user) => res.send(user))
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${messageWrongUpdateData}
            ${Object.values(err.errors).map((e) => e.message).join(', ')}`));
      } else { next(err); }
    });
};

const login = (req, res, next) => {
  const { email, password } = req.body;
  User.findOne({ email })
    .select('+password')
    .orFail(new AuthError(messageWrongAuth))
    .then((user) => {
      bcrypt.compare(password, user.password)
        .then((matched) => {
          if (!matched) {
            throw new AuthError(messageWrongAuth);
          }
          const token = jwt.sign({ _id: user._id }, JWT_SECRET_KEY, { expiresIn: '7d' });
          res.send({ token });
        })
        .catch(next);
    })
    .catch(next);
};

module.exports = {
  createUser,
  updateUser,
  login,
  getLoginUser,
};
