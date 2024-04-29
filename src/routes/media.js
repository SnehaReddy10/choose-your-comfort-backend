const express = require('express');
const UploadMediaController = require('../controllers/media/upload-image.controller');
const multer = require('multer');
const DeleteMediaController = require('../controllers/media/delete-image.controller');
const GetImageController = require('../controllers/media/get-image.controller');
const upload = multer({ dest: 'uploads/' });

const mediaRouter = express.Router();

mediaRouter.get('/:mediaId', GetImageController);
mediaRouter.post('/upload', upload.single('avatar'), UploadMediaController);
mediaRouter.delete('/delete/:mediaId', DeleteMediaController);

module.exports = mediaRouter;
