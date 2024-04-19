const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Faq = require('../../models/Faq.model');
const z = require('zod');

const faqSchema = z.object({
  question: z.string(),
  answer: z.string(),
});

const AddFaqController = async (req, res) => {
  try {
    const { question, answer } = req.body;
    const { success, error } = faqSchema.safeParse({ question, answer });
    if (!success) {
      const errors = error.errors.map((x) => x.message);
      return res.status(STATUS_CODES.BadRequest).json({ errors });
    }
    const faq = await Faq.create({ question, answer });
    faq.save();
    return res.json({ faq });
  } catch (err) {
    console.log('AddFaqController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = AddFaqController;
