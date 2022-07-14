const mongoose = require('mongoose');
const validator = require('validator');
const regexURL = require('../helpers/constants');

const urlValidation = v => regexURL.test(v);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Минимальная длина - 2 символа'],
    maxlength: [30, 'Максимальная длина - 30 символов'],
    default: 'Жак-Ив Кусто',
  },
  about: {
    type: String,
    minlength: [2, 'Минимальная длина - 2 символа'],
    maxlength: [30, 'Максимальная длина - 30 символов'],
    default: 'Исследователь',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    use: {
      urlValidation,
      message: () => 'Некорректный формат ссылки',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Некорректный формат email',
    },
  },
  password: {
    type: String,
    required: true,
    select: false
  },
});

exports.User = mongoose.model('user', userSchema);

