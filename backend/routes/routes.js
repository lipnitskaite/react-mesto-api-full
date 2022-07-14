const routes = require('express').Router();

const { usersRoutes } = require('./usersRoutes');
const { cardsRoutes } = require('./cardsRoutes');

const NotFoundError = require('../errors/NotFoundError');

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

routes.all('*', (req, res, next) => {
  throw new NotFoundError('Такой страницы не существует');

  next(err);
});

exports.routes = routes;

