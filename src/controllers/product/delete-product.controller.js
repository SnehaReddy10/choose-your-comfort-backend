const { PRODUCT } = require('../../constants/messages');
const Product = require('../../models/Product');

const DeleteProductController = async (req, res) => {
  try {
    const productId = req.params.productId;

    await Product.findByIdAndDelete(productId);

    return res.status(204).send(PRODUCT.DELETED);
  } catch (err) {
    console.log('DeleteProductController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = DeleteProductController;
