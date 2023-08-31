const Movie = require('../models/movie');

const {
  BadRequestError,
  ForbiddenError,
  NotFoundError,
} = require('../errors');

const {
  messageWrongMovie,
  messageNotFoundMovie,
  messageRemoveForbidden,
  messageWrongMovieRemove,
} = require('../utils/messagesErrors');

const getMovies = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.find({ owner: ownerId })
    .orFail(new NotFoundError(`${messageNotFoundMovie} ${ownerId}`))
    .then((movies) => {
      res.send(movies);
    })
    .catch((err) => { next(err); });
};

const addFavoriteMovie = (req, res, next) => {
  const ownerId = req.user._id;
  Movie.create({ ...req.body, owner: ownerId })
    .then((addMovie) => {
      res.send(addMovie);
    })
    .catch((err) => {
      if (err.name === 'ValidationError') {
        next(new BadRequestError(`${messageWrongMovie}`));
      } else { next(err); }
    });
};

const removeFavoriteMovieById = (req, res, next) => {
  const ownerId = req.user._id;
  const { movieId } = req.params;
  console.log(req.user);
  Movie.findById(movieId)
    .orFail(new NotFoundError(`${messageNotFoundMovie} ${movieId}`))
    .then((findMovie) => {
      if (findMovie.owner.toString() !== ownerId) {
        throw new ForbiddenError(`${findMovie.nameRU} ${messageRemoveForbidden}`);
      }
      Movie.findByIdAndRemove(movieId)
        .orFail(new NotFoundError(`${messageNotFoundMovie} ${movieId}`))
        .then((deletedMovie) => { res.send(deletedMovie); })
        .catch((err) => {
          if (err.name === 'CastError') {
            next(new BadRequestError(`${messageWrongMovieRemove} ${movieId}`));
          } else { next(err); }
        });
    })
    .catch((err) => {
      if (err.name === 'CastError') {
        next(new BadRequestError(`${messageWrongMovieRemove} ${movieId}`));
      } else { next(err); }
    });
};

module.exports = {
  getMovies,
  addFavoriteMovie,
  removeFavoriteMovieById,
};
