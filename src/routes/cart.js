const express = require('express');
const AddProductController = require('../controllers/cart/add-product.controller');
const DeleteCartController = require('../controllers/cart/delete-cart.controller');
const RemoveProductController = require('../controllers/cart/remove-product.controller');
const GetCartController = require('../controllers/cart/get-cart.controller');
const PlaceOrderController = require('../controllers/cart/place-order.controller');

const cartRouter = express.Router();

cartRouter.post('/place-order', PlaceOrderController);
cartRouter.post('/:productId', AddProductController);
cartRouter.delete('/:productId', RemoveProductController);
cartRouter.get('/', GetCartController);
cartRouter.delete('/', DeleteCartController);

module.exports = cartRouter;
