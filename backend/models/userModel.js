const mongoose = require('mongoose');
const validator = require('validator');
const regexURL = require('../helpers/constants');

const urlValidation = (v) => regexURL.test(v);

const userSchema = new mongoose.Schema({
  name: {
    type: String,
    minlength: [2, 'Minimum length - 2 characters'],
    maxlength: [30, 'Maximum length - 30 characters'],
    default: 'Jacques Cousteau',
  },
  about: {
    type: String,
    minlength: [2, 'Minimum length - 2 characters'],
    maxlength: [30, 'Maximum length - 30 characters'],
    default: 'Explorer',
  },
  avatar: {
    type: String,
    default: 'https://pictures.s3.yandex.net/resources/jacques-cousteau_1604399756.png',
    use: {
      urlValidation,
      message: () => 'Invalid link format',
    },
  },
  email: {
    type: String,
    required: true,
    unique: true,
    validate: {
      validator: (v) => validator.isEmail(v),
      message: () => 'Invalid email format',
    },
  },
  password: {
    type: String,
    required: true,
    select: false,
  },
});

exports.User = mongoose.model('user', userSchema);
