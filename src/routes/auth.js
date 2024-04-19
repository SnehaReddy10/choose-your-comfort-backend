const express = require('express');
const SignupController = require('../controllers/auth/signup.controller');
const SigninController = require('../controllers/auth/signin.controller');

const authRouter = express.Router();
authRouter.post('/signup', SignupController);
authRouter.post('/signin', SigninController);

module.exports = authRouter;
