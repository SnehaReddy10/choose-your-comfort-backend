const { WISHLIST } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const WishList = require('../../models/WishList');

const GetWishlistController = async (req, res) => {
  try {
    const wishList = await WishList.findOne({ userId: req.user._id }).populate(
      'products'
    );
    if (!wishList) {
      return res.status(STATUS_CODES.NotFound).send(WISHLIST.NOT_FOUND);
    }

    return res.json({ wishList });
  } catch (err) {
    console.log('GetWishlistController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = GetWishlistController;
