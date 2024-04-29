const WishList = require('../../models/WishList');

const CreateWishlistController = async (req, res) => {
  try {
    const wishList = await WishList({ userId: req.user._id });
    wishList.save();
  } catch (err) {
    console.log('CreateWishlistController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = CreateWishlistController;
