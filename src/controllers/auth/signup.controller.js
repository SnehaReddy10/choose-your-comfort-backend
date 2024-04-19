const z = require('zod');
const jwt = require('jsonwebtoken');
const User = require('../../models/User');
const bcrypt = require('bcryptjs');
const { USER } = require('../../constants/messages');
const GENERIC_ERRORS = require('../../constants/generic-errors');
const CreateWishlistController = require('../wishlist/create-wishlist.controller');
const CreateCartController = require('../cart/create-cart.controller');

const signupSchema = z.object({
  username: z.string().max(40, USER.USERNAME_MAX_50),
  email: z.string().email(USER.INVALID_EMAIL),
  password: z.string().min(8, USER.PASSWORD_MIN_8),
  confirmPassword: z.string().min(),
});

const SignupController = async (req, res) => {
  try {
    const { username, email, password, confirmPassword } = req.body;

    const { success, error } = signupSchema.safeParse({
      username,
      email,
      password,
      confirmPassword,
    });

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      return res.status(411).json({ errors: errors });
    }

    if (password !== confirmPassword) {
      return res.status(411).json({ error: USER.PASSWORD_SHOULD_MATCH });
    }

    const existingUser = await User.findOne({ username }).exec();
    if (existingUser) {
      return res.status(411).json({ error: USER.USER_ALREADY_EXISTS });
    }

    const hashedPassword = bcrypt.hashSync(password, 8);

    const user = new User({ username, password: hashedPassword, email });
    await user.save();

    req.user = user;

    await CreateWishlistController(req, res);
    await CreateCartController(req, res);

    const token = jwt.sign({ userId: user._id }, process.env.JWT_SECRET);

    return res.json({ token });
  } catch (err) {
    console.log('SignupController', err);
    return res
      .status(500)
      .json({ error: GENERIC_ERRORS.INTERNAL_SERVER_ERROR });
  }
};

module.exports = SignupController;
