const jwt = require('jsonwebtoken');
const User = require('../models/User');

const AllowAnonymous = async (req, res, next) => {
  try {
    const accessToken = req.headers.authorization;
    if (accessToken) {
      const token = accessToken.slice(7, accessToken.length);
      if (token !== 'null') {
        const { userId } = jwt.verify(token, process.env.JWT_SECRET);
        if (userId) {
          const user = await User.findById(userId);
          if (user) {
            req.user = user;
          }
        }
      }
    }
    next();
  } catch (err) {
    console.log(err);
    throw err;
  }
};

module.exports = AllowAnonymous;
