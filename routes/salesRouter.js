const express = require('express');
const salesController = require('../controllers/salesController');
const salesValidation = require('../middlewares/salesValidation');
// require('express-rescue');

const router = express.Router();

router.get('/', salesController.getSales);
router.get('/:id', salesController.getSalesById);
router.post('/', salesValidation, salesController.createSale);
router.put('/:id', salesValidation);

module.exports = router;