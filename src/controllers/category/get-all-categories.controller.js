const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Category = require('../../models/Category');

const GetAllCategoriesController = async (req, res) => {
  try {
    const categories = await Category.find();
    res.status(STATUS_CODES.OK).json(categories);
  } catch (error) {
    console.error('Error getting categories:', error);
    res
      .status(STATUS_CODES.InternalServerError)
      .json({ error: COMMON.SERVICE_DOWN });
  }
};

module.exports = GetAllCategoriesController;
