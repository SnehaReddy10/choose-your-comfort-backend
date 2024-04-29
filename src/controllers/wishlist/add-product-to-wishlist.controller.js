const { PRODUCT, COMMON, WISHLIST } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');
const WishList = require('../../models/WishList');

const AddProductToWishListController = async (req, res) => {
  try {
    const productId = req.params.productId;

    const existingWishlist = await WishList.findOne({ userId: req.user._id });

    const existingProduct = await Product.findById(productId);

    if (!existingWishlist) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: WishList.NOT_FOUND });
    }

    if (!existingProduct) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: PRODUCT.NOT_FOUND });
    }

    await WishList.findByIdAndUpdate(existingWishlist._id, {
      products: [...existingWishlist.products, productId],
    });

    await Product.findByIdAndUpdate(productId, {
      usersWishlisted: [...existingProduct.usersAddedToCart, req.user._id],
    });

    return res.send(WISHLIST.PRODUCT_ADDED);
  } catch (err) {
    console.log('Add-Product-To-Wishlist', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = AddProductToWishListController;
