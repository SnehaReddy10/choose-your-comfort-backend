const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Faq = require('../../models/Faq.model');

const DeleteFaqController = async (req, res) => {
  try {
    const faqId = req.params.faqId;
    await Faq.findByIdAndDelete(faqId);
    return res.status(STATUS_CODES.NoContent).send('FAQ Deleted Successfully');
  } catch (err) {
    console.log('DeleteFaqController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = DeleteFaqController;
