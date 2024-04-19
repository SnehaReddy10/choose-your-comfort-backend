const express = require('express');
const GetAllFaqsController = require('../controllers/faq/get-all-faqs.controller');
const AddFaqController = require('../controllers/faq/add-faq.controller');
const DeleteFaqController = require('../controllers/faq/delete-faq.controller');

const faqRouter = express.Router();

faqRouter.get('/', GetAllFaqsController);
faqRouter.post('/', AddFaqController);
faqRouter.delete('/:faqId', DeleteFaqController);

module.exports = faqRouter;
