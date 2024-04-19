const express = require('express');

const addressRouter = express.Router();

addressRouter.get('/');

module.exports = addressRouter;
