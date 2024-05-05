const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Cart = require('../../models/Cart');
const Product = require('../../models/Product');

const MakePaymentController = async (req, res) => {
  try {
    const stripe = require('stripe')(process.env.STRIPE_PRIVATE_KEY);

    const cart = await Cart.findOne({
      userId: req.user._id.toString(),
    }).populate('products');

    const lineItemsPromises = cart.products.map(async (x) => {
      const storeItem = await Product.findById(x.productId);
      return {
        price_data: {
          currency: 'usd',
          product_data: {
            name: storeItem.name,
          },
          unit_amount: storeItem.discountedPrice * 100,
        },
        quantity: x.quantity,
      };
    });

    const lineItems = await Promise.all(lineItemsPromises);

    const session = await stripe.checkout.sessions.create({
      payment_method_types: ['card'],
      mode: 'payment',
      line_items: lineItems,
      success_url: `${process.env.CLIENT_URL}/checkout`,
      cancel_url: `${process.env.CLIENT_URL}/payment-cancel`,
    });

    return res.send(session.url);
  } catch (err) {
    console.log(err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = MakePaymentController;
