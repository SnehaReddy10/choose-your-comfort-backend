const { CART, COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');

const DeleteCartController = async (req, res) => {
  try {
    const cart = await Cart.findOne({ userId: req.user._id });
    if (!cart) {
      return res.status(STATUS_CODES.NotFound).send(CART.NOT_FOUND);
    }

    await Cart.findByIdAndDelete(cart._id);
    return res.status(STATUS_CODES.NoContent).send(CART.DELETED);
  } catch (err) {
    console.log('DeleteCartController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = DeleteCartController;
