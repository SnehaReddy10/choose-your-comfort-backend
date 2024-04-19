const Product = require('../../models/Product');

const GetProductsByCategoryController = async (req, res) => {
  try {
    const category = req.params.category;

    const products = await Product.find({ category });

    return res.json({ data: products });
  } catch (err) {
    console.log('GetProductsByCategoryController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = GetProductsByCategoryController;
