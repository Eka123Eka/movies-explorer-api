const router = require('express').Router();
const userRoute = require('./users');
const moviesRoute = require('./movies');

const { createUser, login } = require('../controllers/users');
const auth = require('../middlewares/auth');
const { NotFoundError } = require('../errors');
const { validCreateUser, validLogin } = require('../utils/joyValidation');
const { messagePageNotFound } = require('../utils/messagesErrors');

router.post('/signup', validCreateUser, createUser);
router.post('/signin', validLogin, login);

router.use('/users', auth, userRoute);
router.use('/movies', auth, moviesRoute);
router.use('*', auth, (req, res, next) => next(new NotFoundError(messagePageNotFound)));

module.exports = router;
