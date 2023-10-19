const routes = require('express').Router();

const { createUserValidation, loginUserValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

const { createUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/loginController');

const { usersRoutes } = require('./usersRoutes');
const { cardsRoutes } = require('./cardsRoutes');

const NotFoundError = require('../errors/NotFoundError');

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error("The server's about to go down");
  }, 0);
});

routes.post('/signup', createUserValidation, createUser);
routes.post('/signin', loginUserValidation, loginUser);

routes.use(auth);

routes.get('/signout', (req, res) => {
  res.clearCookie('jwt', {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
    sameSite: 'none',
  })
    .send({ message: 'The user is logged out' });
});

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

routes.all('*', (req, res, next) => {
  throw new NotFoundError("This page doesn't exist");

  // eslint-disable-next-line no-undef, no-unreachable
  next(err);
});

exports.routes = routes;
