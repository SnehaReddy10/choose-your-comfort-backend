const { default: mongoose } = require('mongoose');

const CartModel = mongoose.Schema({
  products: [{ type: mongoose.Types.ObjectId, ref: 'productAddedToCart' }],
  deliveryCharge: { type: Number, default: 0 },
  totalPrice: {
    type: Number,
    default: 0,
  },
  discountedPrice: { type: Number, default: 0 },
  userId: { type: mongoose.Types.ObjectId, ref: 'user' },
});

const Cart = mongoose.model('cart', CartModel);

module.exports = Cart;
