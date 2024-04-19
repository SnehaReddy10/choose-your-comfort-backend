const { default: mongoose } = require('mongoose');

const CustomerReviewModel = mongoose.Schema({
  customerId: String,
  profileImg: String,
  name: String,
  rating: String,
  feedback: String,
});

const CustomerReview = mongoose.model(
  'customerReviewModel',
  CustomerReviewModel
);

module.exports = CustomerReview;
