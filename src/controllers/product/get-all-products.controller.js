const GENERIC_ERRORS = require('../../constants/generic-errors');
const Product = require('../../models/Product');

const GetAllProductsController = async (req, res) => {
  try {
    const products = await Product.find();
    if (req.user) {
      products.map((product) => {
        if (product.usersAddedToCart.includes(req.user._id)) {
          product.productExistsInUsersCart = true;
        }
        if (product.usersWishlisted.includes(req.user._id)) {
          product.productExistsInUsersWishlist = true;
        }
      });
    }

    return res.json({ data: products });
  } catch (err) {
    console.log('GetAllProductsController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = GetAllProductsController;
