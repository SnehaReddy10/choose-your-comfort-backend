const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const ProductAddedToCart = require('../../models/ProductAddedToCart');

const PlaceOrderController = async (req, res) => {
  try {
    const userId = req.user._id.toString();

    const existingCart = await Cart.findOne({ userId });

    const productsInCart = existingCart.products;

    productsInCart.map(async (product) => {
      const productWithQuantity = await ProductAddedToCart.findById(
        product.toString()
      );
      await Product.findByIdAndUpdate(
        productWithQuantity.productId.toString(),
        {
          $pull: { usersAddedToCart: userId },
        }
      );
    });

    await Cart.deleteOne({ userId });

    const cart = await Cart.create({ userId });
    cart.save();
    return res.json({ cart });
  } catch (err) {
    console.log('PlaceOrderController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = PlaceOrderController;
