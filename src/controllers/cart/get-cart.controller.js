const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');

const GetCartController = async (req, res) => {
  try {
    const userId = req.user._id;
    const cart = await Cart.findOne({ userId }).populate({
      path: 'products',
      populate: { path: 'productId', populate: 'imgUrl' },
    });
    return res.json({ cart });
  } catch (err) {
    console.log('GetCartController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = GetCartController;
