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

const createProduct = async (req, res) => {
  const { name, quantity } = req.body;
  const product = await productsService.createProduct({ name, quantity });
  if (product.error) {
    return res.status(409).json({ message: product.message });
  }
  res.status(201).json(product);
};

const updateProduct = async (req, res) => {
  const { id } = req.params;
  const { name, quantity } = req.body;
  const product = await productsService.updateProduct(name, quantity, id);
  console.log('???', product);
  if (product.error) {
    return res.status(404).json({ message: product.message });
  }
  res.status(200).json(product);
};

module.exports = {
  getAllProducts,
  getProductById,
  createProduct,
  updateProduct,
};