const routes = require('express').Router();

const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');

const { checkCors } = require('../middlewares/cors');
const { requestLogger } = require('../middlewares/logger');
const { createUserValidation, loginUserValidation } = require('../middlewares/validation');
const { auth } = require('../middlewares/auth');

const { createUser } = require('../controllers/userController');
const { loginUser } = require('../controllers/loginController');

const { usersRoutes } = require('./usersRoutes');
const { cardsRoutes } = require('./cardsRoutes');

const NotFoundError = require('../errors/NotFoundError');

routes.use(checkCors);
routes.use(cookieParser());

routes.use(bodyParser.json());
routes.use(bodyParser.urlencoded({ extended: true }));

routes.use(requestLogger);

routes.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

routes.post('/signup', createUserValidation, createUser);
routes.post('/signin', loginUserValidation, loginUser);

routes.use(auth);

routes.get('/signout', (req, res) => {
  res.clearCookie('jwt', {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
    sameSite: true,
  })
    .send({ message: 'Пользователь вышел' });
});

routes.use('/users', usersRoutes);
routes.use('/cards', cardsRoutes);

routes.all('*', (req, res, next) => {
  throw new NotFoundError('Такой страницы не существует');

  // eslint-disable-next-line no-undef, no-unreachable
  next(err);
});

exports.routes = routes;
