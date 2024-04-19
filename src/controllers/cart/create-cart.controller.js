const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');

const CreateCartController = async (req, res) => {
  try {
    const cart = await Cart({ userId: req.user._id });
    await cart.save();
  } catch (err) {
    console.log('CreateCartController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = CreateCartController;
