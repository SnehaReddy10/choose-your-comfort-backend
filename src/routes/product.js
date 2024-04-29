const express = require('express');
const GetProductController = require('../controllers/product/get-product.controller');
const CreateProductController = require('../controllers/product/create-product.controller');
const GetAllProductsController = require('../controllers/product/get-all-products.controller');
const DeleteProductController = require('../controllers/product/delete-product.controller');
const UpdateProductController = require('../controllers/product/update-product.controller');
const GetProductsByCategoryController = require('../controllers/product/get-product-by-category.controller');

const productRouter = express.Router();

productRouter.get('/:productId', GetProductController);
productRouter.get('/category/:category', GetProductsByCategoryController);
productRouter.get('/', GetAllProductsController);
productRouter.post('/', CreateProductController);
productRouter.put('/:productId', UpdateProductController);
productRouter.delete('/:productId', DeleteProductController);

module.exports = productRouter;
