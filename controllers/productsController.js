const productsService = require('../services/productsService');
const { HTTP_OK, HTTP_NOT_FOUND } = require('../helpers/codes');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getProducts();
  res.status(HTTP_OK).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (product.error) {
    return res.status(HTTP_NOT_FOUND).json({ message: product.message });
  }
  res.status(HTTP_OK).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};