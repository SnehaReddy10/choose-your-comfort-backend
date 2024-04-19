const { CART, PRODUCT, COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const ProductAddedToCart = require('../../models/ProductAddedToCart');

const AddProductController = async (req, res) => {
  try {
    const productId = req.params.productId;
    console.log('add product to cart ', productId);

    const existingCart = await Cart.findOne({ userId: req.user._id });

    const existingProduct = await Product.findById(productId);

    if (!existingCart) {
      return res.status(STATUS_CODES.NotFound).json({ error: CART.NOT_FOUND });
    }

    if (!existingProduct) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: PRODUCT.NOT_FOUND });
    }

    const totalPrice = (
      existingCart.totalPrice + existingProduct.actualPrice
    ).toFixed(2);
    const discountedPrice = (
      existingCart.discountedPrice + existingProduct.discountedPrice
    ).toFixed(2);

    let deliveryCharge = 100;

    if (discountedPrice > 500) {
      deliveryCharge = 0;
    }

    const productToBeAddedToCart = await ProductAddedToCart({
      productId,
      quantity: 1,
    });
    await productToBeAddedToCart.save();

    await Cart.findByIdAndUpdate(existingCart._id, {
      products: [...existingCart.products, productToBeAddedToCart],
      totalPrice,
      discountedPrice,
      deliveryCharge,
    });

    await Product.findByIdAndUpdate(productId, {
      usersAddedToCart: [...existingProduct.usersAddedToCart, req.user._id],
    });

    return res.send(CART.PRODUCT_ADDED);
  } catch (err) {
    console.log('Add-Product-To-Cart', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = AddProductController;
