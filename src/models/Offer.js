const { default: mongoose } = require('mongoose');

const OfferModel = mongoose.model({
  offerId: String,
  imgUrl: String,
  description: String,
  savings: String,
  validTill: String,
});

const Offer = mongoose.model('offer', OfferModel);

module.exports = Offer;
