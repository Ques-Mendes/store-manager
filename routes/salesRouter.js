const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');
require('express-async-errors');

const router = express.Router();

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);
router.post('/', salesValidation, salesController.createSale);
router.put('/:id', salesValidation, salesController.updateSale);

module.exports = router;