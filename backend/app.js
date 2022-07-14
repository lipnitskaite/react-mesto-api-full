const express = require('express');
const cookieParser = require('cookie-parser');
const bodyParser  = require('body-parser');
const mongoose  = require('mongoose');
const { errors } = require('celebrate');

const { createUserValidation, loginUserValidation } = require('./middlewares/validation');
const { auth } = require('./middlewares/auth');
const { requestLogger, errorLogger } = require('./middlewares/logger');

const { routes } = require('./routes/routes');

const { createUser } = require('./controllers/userController');
const { loginUser } = require('./controllers/loginController');

const { PORT = 3000 } = process.env;

const app = express();

app.use(cookieParser());

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));

app.use(requestLogger);

app.post('/signup', createUserValidation, createUser);
app.post('/signin', loginUserValidation, loginUser);

app.use(auth);

app.use(routes);

async function main() {
  await mongoose.connect('mongodb://localhost:27017/mestodb');

  app.listen(PORT, () => {
    console.log(`App listening on port ${PORT}`);
  });
};

app.use(errorLogger);

app.use(errors());

app.use((err, req, res, next) => {
  const { statusCode = 500, message} = err;

  res
    .status(statusCode)
    .send({
      message: statusCode === 500
        ? 'На сервере произошла ошибка'
        : message
    });
});

main();