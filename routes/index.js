const express = require('express');
const handleError = require('../middlewares/handleError');
const productsRouter = require('./productsRouter');
const salesRouter = require('./salesRouter');

const router = express.Router();

router.use('/products', productsRouter);
router.use('/sales', salesRouter);
router.use(handleError);

module.exports = router;