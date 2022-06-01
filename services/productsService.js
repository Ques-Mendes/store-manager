const productsModel = require('../models/productsModel');

const getProducts = async () => {
  const [products] = await productsModel.getAll();
  return products;
};

const getProductById = async (id) => {
  const product = await productsModel.getById(id);
  if (!product) {
    return {
      error: true,
      message: 'Product not found',
    };
  }
  return product;
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

const updateProduct = async (name, quantity, id) => {
  await getProductById(id);
  const product = await productsModel.updateProduct(name, quantity, id);
  console.log('??', getProductById(id));
  // if (!product) {
  //   return {
  //     error: true,
  //     message: 'Product not found',
  //   };
  // }  
  return product;
};

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};