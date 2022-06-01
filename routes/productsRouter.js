const express = require('express');
const productsController = require('../controllers/productsController');
const productsValidation = require('../middlewares/productsValidation');
// require('express-rescue');

const router = express.Router();

router.get('/', productsController.getAllProducts);
router.get('/:id', productsController.getProductById);
router.post('/', productsValidation, productsController.createProduct);
router.put('/:id', productsValidation);

module.exports = router;