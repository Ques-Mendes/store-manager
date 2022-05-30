const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const [products] = await productsModel.getAll();
  return products;
};

const getProductById = async (id) => {
  const [product] = await productsModel.getById(id);
  if (!product.length) {
    return {
      error: true,
      message: 'Product not found',
    };
  }
  const [products] = product;
  return products;
};

module.exports = {
  getProducts,
  getProductById,
};