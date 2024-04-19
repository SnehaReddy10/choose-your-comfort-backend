const z = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { USER } = require('../../constants/messages');
const GENERIC_ERRORS = require('../../constants/generic-errors');

const signinSchema = z.object({
  username: z.string(),
  password: z.string(),
});

const SigninController = async (req, res) => {
  try {
    const { username, password } = req.body;

    const { success, error } = signinSchema.safeParse({
      username,
      password,
    });

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      return res.status(411).json({ errors: errors });
    }

    const existingUser = await User.findOne({ username }).exec();
    if (!existingUser) {
      return res.status(404).json({ error: USER.NOT_FOUND });
    }

    const isCredentialsValid = bcrypt.compareSync(
      password,
      existingUser.password
    );

    if (!isCredentialsValid) {
      return res.status(411).json({ error: USER.INVALID_CREDENTIALS });
    }

    const token = jwt.sign(
      { userId: existingUser._id },
      process.env.JWT_SECRET
    );

    return res.json({ token });
  } catch (err) {
    console.log('SigninController', err);
    return res
      .status(500)
      .json({ error: GENERIC_ERRORS.INTERNAL_SERVER_ERROR });
  }
};

module.exports = SigninController;
