const { checkToken } = require('../helpers/jwt');

exports.auth = async (req, res, next) => {
  const { jwt } = req.cookies;
  let payload;
  try {
    payload = checkToken(jwt);
  } catch (err) {
    next(err);
    return;
  }
  req.user = { _id: payload._id.toString() };

  next();
};
