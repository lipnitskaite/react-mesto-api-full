const express = require('express');
const usersRoutes = express.Router();
const { updateUserValidation, updateUserAvatarValidation, userIDValidation } = require('../middlewares/validation');
const { getUsers, doesUserExist, getUserByID, getCurrentUser, updateUser, updateUserAvatar } = require('../controllers/userController');

usersRoutes.get('/', getUsers);

usersRoutes.get('/me', getCurrentUser);
usersRoutes.patch('/me', updateUserValidation, updateUser);

usersRoutes.get('/:userId', userIDValidation, doesUserExist);
usersRoutes.get('/:userId', getUserByID);

usersRoutes.patch('/me/avatar', updateUserAvatarValidation, updateUserAvatar);

exports.usersRoutes = usersRoutes;