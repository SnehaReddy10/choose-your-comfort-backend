const express = require('express');
const GetWishlistController = require('../controllers/wishlist/get-wishlist.controller');
const AddProductToWishListController = require('../controllers/wishlist/add-product-to-wishlist.controller');
const RemoveProductFromWishlistController = require('../controllers/wishlist/remove-wishilist-product.controller');

const wishListRouter = express.Router();

wishListRouter.get('/', GetWishlistController);
wishListRouter.post('/:productId', AddProductToWishListController);
wishListRouter.delete('/:productId', RemoveProductFromWishlistController);

module.exports = wishListRouter;
