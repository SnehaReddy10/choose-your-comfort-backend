const GetUser = (req, res) => {
  try {
    return req.user;
  } catch (err) {
    console.log('GetUser', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = GetUser;
