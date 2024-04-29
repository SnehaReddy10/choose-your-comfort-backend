const { CATEGORY, COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Category = require('../../models/Category');

const DeleteCategoryController = async (req, res) => {
  try {
    const { categoryId } = req.params;
    const deletedCategory = await Category.findByIdAndDelete(categoryId);
    if (!deletedCategory) {
      return res
        .status(STATUS_CODES.NotFound)
        .json({ error: CATEGORY.NOT_FOUND });
    }
    res.status(200).json(deletedCategory);
  } catch (error) {
    console.error('Error deleting category:', error);
    res.status(500).json({ error: COMMON.SERVICE_DOWN });
  }
};

module.exports = DeleteCategoryController;
