const { PRODUCT } = require('../../constants/messages');
const Product = require('../../models/Product');
const z = require('zod');

const updateProductSchema = z.object({
  name: z.string().optional(),
  description: z.string().optional(),
  actualPrice: z.number().optional(),
  discountedPrice: z.number().optional(),
});

const UpdateProductController = async (req, res) => {
  try {
    const productId = req.params.productId;
    const { name, description, actualPrice, discountedPrice } = req.body;

    const { success, error } = updateProductSchema.safeParse({
      name,
      description,
      actualPrice,
      discountedPrice,
    });

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      return res.status(411).json({ errors });
    }

    const existingProduct = await Product.findById(productId);
    if (!existingProduct) {
      return res.status(404).json({ error: PRODUCT.NOT_FOUND });
    }

    let product = await Product.findByIdAndUpdate(existingProduct._id, {
      name,
      description,
      actualPrice,
      discountedPrice,
    });

    return res.json({ product });
  } catch (err) {
    console.log('UpdateProductController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = UpdateProductController;
