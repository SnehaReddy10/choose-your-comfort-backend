const { default: mongoose } = require('mongoose');

const ProductAddedToCartSchema = mongoose.Schema({
  quantity: Number,
  productId: { type: mongoose.Types.ObjectId, ref: 'product' },
});

const ProductAddedToCart = mongoose.model(
  'productAddedToCart',
  ProductAddedToCartSchema
);

module.exports = ProductAddedToCart;
