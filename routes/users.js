const router = require('express').Router();
const { validUpdateUser } = require('../utils/joyValidation');

const {
  getLoginUser,
  updateUser,
} = require('../controllers/users');

router.get('/me', getLoginUser);
router.patch('/me', validUpdateUser, updateUser);

module.exports = router;
