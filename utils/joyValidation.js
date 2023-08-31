const { celebrate, Joi } = require('celebrate');
const { regexUrlValidation } = require('./regexes');

// users
const validCreateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validUpdateUser = celebrate({
  body: Joi.object().keys({
    name: Joi.string().min(2).max(30),
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

const validLogin = celebrate({
  body: Joi.object().keys({
    email: Joi.string().required().email(),
    password: Joi.string().required(),
  }),
});

// movies
const validSetLikeMovies = celebrate({
  body: Joi.object().keys({
    country: Joi.string().required(),
    director: Joi.string().required(),
    duration: Joi.number().required(),
    year: Joi.string().required(),
    description: Joi.string().required(),
    image: Joi.string().required().regex(regexUrlValidation),
    trailerLink: Joi.string().required().regex(regexUrlValidation),
    thumbnail: Joi.string().required().regex(regexUrlValidation),
    owner: Joi.string().alphanum().length(24).hex(),
    movieId: Joi.number().integer().required(),
    nameRU: Joi.string().required(),
    nameEN: Joi.string().required(),
  }),
});

const validUnsetLikeMovies = celebrate({
  params: Joi.object().keys({
    movieId: Joi.string().alphanum().length(24).hex()
      .required(),
  }),
});

module.exports = {
  validCreateUser,
  validUpdateUser,
  validLogin,
  validSetLikeMovies,
  validUnsetLikeMovies,
};
