const { default: mongoose } = require('mongoose');

const categorySchema = mongoose.Schema({
  label: String,
});

const Category = mongoose.model('category', categorySchema);

module.exports = Category;
