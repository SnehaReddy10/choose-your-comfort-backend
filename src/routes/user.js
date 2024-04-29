const express = require('express');
const GetUser = require('../controllers/user/get-user.controller');
const AddAddressController = require('../controllers/user/add-address.controller');
const SendEmail = require('../controllers/mail/send-email.controller');

const userRouter = express.Router();

userRouter.get('/', GetUser);
userRouter.post('/address', AddAddressController);
userRouter.post('/send-email', SendEmail);

module.exports = userRouter;
