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

async function updateProduct({ name, quantity, id }) {
  // const productId = await getProductById(id);  
  await productsModel.updateProduct(name, quantity, id);
  return {
    id,
    name,
    quantity,
  };  
  // if (!productId.error) return product;

  // console.log('??', product);
  // if (!product) {
  //   return {
  //     error: true,
  //     message: 'Product not found',
  //   };
  // }    
}

module.exports = {
  getProducts,
  getProductById,
  createProduct,
  updateProduct,
};