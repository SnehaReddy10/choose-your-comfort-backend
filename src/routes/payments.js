const express = require('express');
const MakePaymentController = require('../controllers/payments/make-payment.controller');
const paymentRouter = express.Router();

paymentRouter.post('/make-payment', MakePaymentController);

module.exports = paymentRouter;
