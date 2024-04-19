const { default: mongoose } = require('mongoose');

const MediaSchema = mongoose.Schema({
  filename: String,
  contentType: String,
  data: Buffer,
});

const Media = mongoose.model('media', MediaSchema);

module.exports = Media;
