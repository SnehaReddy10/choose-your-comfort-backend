const { default: mongoose } = require('mongoose');

const WishListModel = mongoose.Schema({
  wishilistId: String,
  products: [{ type: mongoose.Types.ObjectId, ref: 'product' }],
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },
});

const WishList = mongoose.model('wishList', WishListModel);

module.exports = WishList;
