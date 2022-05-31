const productsService = require('../services/productsService');
// const { HTTP_OK, HTTP_NOT_FOUND } = require('../helpers/codes');

const getAllProducts = async (_req, res) => {
  const products = await productsService.getProducts();
  res.status(200).json(products);
};

const getProductById = async (req, res) => {
  const { id } = req.params;
  const product = await productsService.getProductById(id);
  if (product.error) {
    return res.status(404).json({ message: product.message });
  }
  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
};