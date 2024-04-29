const GENERIC_ERRORS = require('../../constants/generic-errors');
const Product = require('../../models/Product');
const z = require('zod');

const productSchema = z.object({
  name: z.string(),
  description: z.string(),
  imgUrl: z.string(),
  category: z.string(),
  actualPrice: z.number(),
  discountedPrice: z.number(),
});

const CreateProductController = async (req, res) => {
  try {
    const {
      name,
      description,
      imgUrl,
      category,
      actualPrice,
      discountedPrice,
    } = req.body;

    const { success, error } = productSchema.safeParse({
      name,
      description,
      imgUrl,
      category,
      actualPrice,
      discountedPrice,
    });

    if (!success) {
      const errors = error.errors.map((x) => x.message);
      return res.status(411).json({ errors });
    }

    let product = new Product({
      name,
      description,
      imgUrl,
      category,
      actualPrice,
      discountedPrice,
    });

    product = await product.save();

    return res.json({ product });
  } catch (err) {
    console.log('CreateProductController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = CreateProductController;
