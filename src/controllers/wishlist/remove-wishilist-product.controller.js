const { default: mongoose } = require('mongoose');
const { WISHLIST } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const WishList = require('../../models/WishList');
const Product = require('../../models/Product');
const ObjectId = mongoose.Types.ObjectId;

const RemoveProductFromWishlistController = async (req, res) => {
  try {
    const productId = req.params.productId;

    const existingWishlist = await WishList.findOne({ userId: req.user._id });
    if (!existingWishlist) {
      return res.status(STATUS_CODES.NotFound).send(WISHLIST.NOT_FOUND);
    }

    await WishList.findByIdAndUpdate(existingWishlist._id, {
      $pull: { products: new ObjectId(productId) },
    });

    const existingProduct = await Product.findById(productId);
    if (existingProduct) {
      await Product.findByIdAndUpdate(existingProduct._id, {
        $pull: { usersWishlisted: new ObjectId(req.user._id) },
      });
    }

    return res.send(WISHLIST.PRODUCT_REMOVED);
  } catch (err) {
    console.log('RemoveProductFromWishlistController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = RemoveProductFromWishlistController;
