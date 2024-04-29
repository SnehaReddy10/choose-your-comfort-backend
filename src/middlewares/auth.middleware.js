const jwt = require('jsonwebtoken');
const User = require('../models/User');
const STATUS_CODES = require('../constants/status-codes');
const { AUTH } = require('../constants/messages');

const Auth = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    const token = accessToken.slice(7, accessToken.length);
    const { userId } = jwt.verify(token, process.env.JWT_SECRET);
    if (userId) {
      const user = await User.findById(userId);
      if (user) {
        req.user = user;
        next();
      } else {
        return res
          .status(STATUS_CODES.Forbidden)
          .json({ error: AUTH.SIGNIN_REQUIRED });
      }
    } else {
      return res
        .status(STATUS_CODES.Forbidden)
        .json({ error: AUTH.SIGNIN_REQUIRED });
    }
  } catch (err) {
    console.log(err);
    return res
      .status(STATUS_CODES.Forbidden)
      .json({ error: AUTH.SIGNIN_REQUIRED });
  }
};

module.exports = Auth;
