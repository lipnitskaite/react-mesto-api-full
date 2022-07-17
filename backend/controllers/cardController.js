const { Card } = require('../models/cardModel');

const NotFoundError = require('../errors/NotFoundError');
const ForbiddenError = require('../errors/ForbiddenError');

exports.getCards = async (req, res, next) => {
  try {
    const cards = await Card.find({});

    res.send(cards);
  } catch (err) {
    next(err);
  }
};

exports.doesCardExist = async (req, res, next) => {
  try {
    const cards = await Card.findById(req.params.cardId);

    if (!cards) {
      throw new NotFoundError('Запрашиваемая карточка не найдена.');
    }
  } catch(err) {
    next(err);
  }

  next();
};

exports.createCard = async (req, res, next) => {
  try {
    const { name, link } = req.body;

    const newCard = await Card.create({
      name,
      link,
      owner: req.user._id
    });

    res.send(newCard);
  } catch (err) {
    next(err);
  }
};

exports.likeCard = async (req, res, next) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $addToSet: { likes: req.user._id} },
      { new: true },
    );

    res.send(newCard);
  } catch (err) {
    next(err);
  }
};

exports.dislikeCard = async (req, res, next) => {
  try {
    const newCard = await Card.findByIdAndUpdate(
      req.params.cardId,
      { $pull: { likes: req.user._id} },
      { new: true },
    );

    res.send(newCard);
  } catch(err) {
    next(err);
  }
};

exports.deleteCardByID = async (req, res, next) => {
  try {
   const card = await Card.findById(req.params.cardId);

   if (req.user._id === card.owner.toString()) {
    await Card.findByIdAndDelete(req.params.cardId);

    res.send({ message: "Карточка удалена" });
   } else {
    throw new ForbiddenError('Возможно удаление только своих карточек.');
   }
  } catch (err)  {
    next(err);
  }
};