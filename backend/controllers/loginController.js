const bcrypt = require('bcrypt');

const { User } = require('../models/userModel');
const { generateToken } = require('../helpers/jwt');

const UnauthorizedError = require('../errors/UnauthorizedError');

exports.loginUser = async (req, res, next) => {
  try {
    const { email, password } = req.body;

    const foundUser = await User.findOne({ email }).select('+password');

    if (!foundUser) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const isPasswordCorrect = await bcrypt.compare(password, foundUser.password);

    if (!isPasswordCorrect) {
      throw new UnauthorizedError('Incorrect email or password');
    }

    const token = generateToken({ _id: foundUser._id });

    res
      .cookie('jwt', token, {
        maxAge: 3600000 * 24 * 7,
        httpOnly: true,
        sameSite: 'none',
        secure: true,
      })
      .send({ message: 'Successfully signed in' })
      .end();
  } catch (err) {
    next(err);
  }
};
