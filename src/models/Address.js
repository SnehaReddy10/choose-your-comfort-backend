const { default: mongoose } = require('mongoose');

const AddressModel = mongoose.Schema({
  streetName: String,
  city: String,
  state: String,
  pincode: String,
});

const Address = mongoose.model('address', AddressModel);

module.exports = Address;
