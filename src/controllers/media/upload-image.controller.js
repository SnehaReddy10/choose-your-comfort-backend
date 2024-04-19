const GENERIC_ERRORS = require('../../constants/generic-errors');
const Media = require('../../models/Media');
const fs = require('fs');

const UploadMediaController = async (req, res) => {
  try {
    const { originalname, mimetype, path } = req.file;
    const buffer = fs.readFileSync(path);

    const file = new Media({
      filename: originalname,
      contentType: mimetype,
      data: buffer,
    });
    await file.save();

    return res.json({ id: file._id });
  } catch (err) {
    console.log('UploadMediaController', err);
    return res.status(500).send(GENERIC_ERRORS.INTERNAL_SERVER_ERROR);
  }
};

module.exports = UploadMediaController;
