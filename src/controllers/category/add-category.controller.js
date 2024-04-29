const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Category = require('../../models/Category');

const AddCategoryController = async (req, res) => {
  try {
    const { label } = req.body;
    const newCategory = new Category({ label });
    const savedCategory = await newCategory.save();
    res.status(STATUS_CODES.Created).json(savedCategory);
  } catch (error) {
    console.error('Error adding category:', error);
    res
      .status(STATUS_CODES.InternalServerError)
      .json({ error: COMMON.SERVICE_DOWN });
  }
};

module.exports = AddCategoryController;
