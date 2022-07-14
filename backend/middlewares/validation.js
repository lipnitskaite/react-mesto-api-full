const { celebrate, Joi } = require('celebrate');
const { regexURL } = require('../helpers/constants');

exports.createUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (!regexURL.test(value)) {
          return helpers.error('Некорректный формат ссылки');
        }
          return value;
      }),
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['ru', 'com', 'net'] }
      }),
    password: Joi.string()
      .required(),
  }),
});

exports.loginUserValidation = celebrate({
  body: Joi.object().keys({
    email: Joi.string()
      .required()
      .email({
        minDomainSegments: 2,
        tlds: { allow: ['ru', 'com', 'net'] }
      }),
    password: Joi.string()
      .required(),
  }),
});

exports.updateUserValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .min(2)
      .max(30),
    about: Joi.string()
      .min(2)
      .max(30),
  }),
});

exports.updateUserAvatarValidation = celebrate({
  body: Joi.object().keys({
    avatar: Joi.string()
      .custom((value, helpers) => {
        if (!regexURL.test(value)) {
          return helpers.error('Некорректный формат ссылки');
        }
          return value;
      }),
  }),
});

exports.userIDValidation = celebrate({
  params: Joi.object().keys({
    userId: Joi.string().min(24).max(24).hex()
  }),
});

exports.createCardValidation = celebrate({
  body: Joi.object().keys({
    name: Joi.string()
      .required()
      .min(2)
      .max(30),
    link: Joi.string()
      .required()
      .custom((value, helpers) => {
        if (!regexURL.test(value)) {
          return helpers.error('Некорректный формат ссылки');
        }
          return value;
      }),
  }),
});

exports.cardIDValidation = celebrate({
  params: Joi.object().keys({
    cardId: Joi.string().min(24).max(24).hex()
  }),
});