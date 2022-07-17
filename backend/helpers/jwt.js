const jwt = require('jsonwebtoken');
const { NODE_ENV, JWT_SECRET } = process.env;

const UnauthorizedError = require('../errors/UnauthorizedError');

const SECRET_KEY = 'very_secret';

const generateToken = (payload) => {
  return jwt.sign(
    payload,
    NODE_ENV === 'production' ? JWT_SECRET: SECRET_KEY ,
    { expiresIn: '7d' }
  );
};

const checkToken = (token) => {
  if (!token) {
    throw new UnauthorizedError('Необходима авторизация');
  };

  return jwt.verify(token, SECRET_KEY);
};

module.exports = { generateToken, checkToken };