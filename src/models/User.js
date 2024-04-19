const { default: mongoose, Schema } = require('mongoose');

const UserModel = mongoose.Schema({
  username: String,
  password: String,
  email: String,
  addresses: [{ type: Schema.Types.ObjectId, ref: 'address' }],
});

const User = mongoose.model('user', UserModel);

module.exports = User;
