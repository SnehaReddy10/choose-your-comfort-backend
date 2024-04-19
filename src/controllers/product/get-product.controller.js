const Product = require('../../models/Product');

const GetProductController = async (req, res) => {
  try {
    const productId = req.params.productId;

    const product = await Product.findById(productId);

    return res.json({ data: product });
  } catch (err) {
    console.log('GetProductController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = GetProductController;
