const express = require('express');

const cardsRoutes = express.Router();
const { createCardValidation, cardIDValidation } = require('../middlewares/validation');
const {
  getCards,
  doesCardExist,
  createCard,
  likeCard,
  dislikeCard,
  deleteCardByID,
} = require('../controllers/cardController');

cardsRoutes.get('/', getCards);

cardsRoutes.post('/', createCardValidation, createCard);

cardsRoutes.put('/:cardId/likes', cardIDValidation, doesCardExist);
cardsRoutes.put('/:cardId/likes', likeCard);

cardsRoutes.delete('/:cardId/likes', cardIDValidation, doesCardExist);
cardsRoutes.delete('/:cardId/likes', dislikeCard);

cardsRoutes.delete('/:cardId', cardIDValidation, doesCardExist);
cardsRoutes.delete('/:cardId', deleteCardByID);

exports.cardsRoutes = cardsRoutes;
