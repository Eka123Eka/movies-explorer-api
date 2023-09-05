const router = require('express').Router();
const {
  getMovies,
  addFavoriteMovie,
  removeFavoriteMovieById,
} = require('../controllers/movies');
const {
  validSetLikeMovies,
  validUnsetLikeMovies,
} = require('../utils/joyValidation');

router.get('/', getMovies);
router.post('/', validSetLikeMovies, addFavoriteMovie);
router.delete('/:movieId', validUnsetLikeMovies, removeFavoriteMovieById);

module.exports = router;
