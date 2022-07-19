const mongoose = require('mongoose');
const regexURL = require('../helpers/constants');

const urlValidation = (v) => regexURL.test(v);

const cardSchema = new mongoose.Schema({
  name: {
    type: String,
    required: true,
    minlength: [2, 'Минимальная длина - 2 символа'],
    maxlength: [30, 'Максимальная длина - 30 символов'],
  },
  link: {
    type: String,
    required: true,
    use: {
      urlValidation,
      message: () => 'Некорректный формат ссылки',
    },
  },
  owner: {
    type: mongoose.Schema.Types.ObjectId,
    required: true,
    ref: 'user',
  },
  likes: [{
    type: mongoose.Schema.Types.ObjectId,
    ref: 'user',
    default: [],
  }],
  createdAt: {
    type: Date,
    default: Date.now,
  },
});

exports.Card = mongoose.model('card', cardSchema);
