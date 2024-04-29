const { COMMON } = require('../../constants/messages');
const STATUS_CODES = require('../../constants/status-codes');
const Media = require('../../models/Media');

const DeleteMediaController = async (req, res) => {
  try {
    const mediaId = req.params.mediaId;

    await Media.findByIdAndDelete(mediaId);

    return res
      .status(STATUS_CODES.NoContent)
      .send('Media Deleted Successfully');
  } catch (err) {
    console.log('DeleteImageController', err);
    return res
      .status(STATUS_CODES.InternalServerError)
      .send(COMMON.SERVICE_DOWN);
  }
};

module.exports = DeleteMediaController;
