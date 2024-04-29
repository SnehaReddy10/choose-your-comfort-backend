const { default: mongoose } = require('mongoose');

const ProductModel = mongoose.Schema({
  name: String,
  description: String,
  category: String,
  imgUrl: { type: mongoose.Types.ObjectId, ref: 'media' },
  actualPrice: { type: Number, default: 0 },
  discountedPrice: { type: Number, default: 0 },
  instock: Number,
  usersAddedToCart: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  usersWishlisted: [{ type: mongoose.Types.ObjectId, ref: 'user' }],
  productExistsInUsersCart: { type: Boolean, default: false },
  productExistsInUsersWishlist: { type: Boolean, default: false },
});

const Product = mongoose.model('product', ProductModel);

module.exports = Product;
