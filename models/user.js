const mongoose = require('mongoose');
const validator = require('validator');
const { messageWrongEmail } = require('../utils/messagesErrors');

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    required: [true, 'Поле "Name" должно быть заполнено'],
    minlength: [2, 'Минимальная длина поля "name" - 2'],
    maxlength: [30, 'Максимальная длина поля "name" - 30'],
  },
  email: {
    type: String,
    required: [true, 'Поле "Email" должно быть заполнено'],
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: messageWrongEmail,
    },
  },
  password: {
    type: String,
    required: [true, 'Поле "password" должно быть заполнено'],
    select: false,
  },
}, { versionKey: false });

module.exports = mongoose.model('user', userSchema);
