const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Faq = require('../../models/Faq.model');

const GetAllFaqsController = async (req, res) => {
  try {
    const faqs = await Faq.find();
    return res.json({ faqs });
  } catch (err) {
    console.log('GetAllFaqsController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = GetAllFaqsController;
