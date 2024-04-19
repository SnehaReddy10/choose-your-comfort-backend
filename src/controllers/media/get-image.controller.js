const { COMMON } = require('../../constants/messages');
const Media = require('../../models/Media');

const GetImageController = async (req, res) => {
  try {
    const mediaId = req.params.mediaId;

    const media = await Media.findById(mediaId);
    return res.json({ media });
  } catch (err) {
    console.log('GetImageController', err);
    return res.send(COMMON.SERVICE_DOWN);
  }
};

module.exports = GetImageController;
