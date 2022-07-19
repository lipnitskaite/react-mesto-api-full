require('dotenv').config();

const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser = require('body-parser');
const mongoose = require('mongoose');
const { errors } = require('celebrate');

const { createUserValidation, loginUserValidation } = require('./middlewares/validation');
const { auth } = require('./middlewares/auth');
const { checkCors } = require('./middlewares/cors');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { routes } = require('./routes/routes');

const { createUser } = require('./controllers/userController');
const { loginUser } = require('./controllers/loginController');

const { PORT = 3000 } = process.env;

const app = express();

app.use(checkCors);
app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.get('/crash-test', () => {
  setTimeout(() => {
    throw new Error('Сервер сейчас упадёт');
  }, 0);
});

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginUserValidation, loginUser);

app.use(auth);

app.get('/signout', (req, res) => {
  res.clearCookie('jwt', {
    maxAge: 3600000 * 24 * 7,
    httpOnly: true,
    sameSite: true,
  })
    .send({ message: 'Пользователь вышел' });
});

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    // eslint-disable-next-line no-console
    console.log(`App listening on port ${PORT}`);
  });
}

app.use(errorLogger);

app.use(errors());

// eslint-disable-next-line no-unused-vars
app.use((err, req, res, next) => {
  const { statusCode = 500, message } = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message,
    });
});

main();
