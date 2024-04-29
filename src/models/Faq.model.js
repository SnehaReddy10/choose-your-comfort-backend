const { default: mongoose } = require('mongoose');

const FaqSchema = mongoose.Schema({
  question: String,
  answer: String,
});

const Faq = mongoose.model('faq', FaqSchema);

module.exports = Faq;
