const { CART, PRODUCT, COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const mongoose = require('mongoose');
const ObjectId = mongoose.Types.ObjectId;

const RemoveProductController = async (req, res) => {
  try {
    const productId = req.params.productId;

    const cart = await Cart.findOne({ userId: req.user._id }).populate(
      'products'
    );
    if (!cart) {
      return res.status(STATUS_CODES.NotFound).send(CART.NOT_FOUND);
    }

    const product = await Product.findById(productId);
    if (!product) {
      return res.status(STATUS_CODES.NotFound).send(PRODUCT.NOT_FOUND);
    }

    const newProducts = cart.products.filter(
      (x) => x.productId.toString() !== productId
    );

    await Cart.findByIdAndUpdate(cart._id, {
      products: newProducts,
      totalPrice: cart.totalPrice - product.actualPrice,
      discountedPrice: cart.discountedPrice - product.discountedPrice,
    });

    await Product.findByIdAndUpdate(product._id, {
      $pull: { usersAddedToCart: new ObjectId(req.user._id) },
    });
    return res.send(CART.PRODUCT_REMOVED);
  } catch (err) {
    console.log(err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = RemoveProductController;
