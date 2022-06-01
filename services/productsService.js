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

const createProduct = async ({ name, quantity }) => {
  const [product] = await productsModel.getProductByName(name);
  if (product.length) {
    return { 
      error: true, 
      message: 'Product already exists',
    };
  }
  const [productCreated] = await productsModel.createProduct(name, quantity);
  return {
    id: productCreated.insertId,
    name,
    quantity,
  };
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
};