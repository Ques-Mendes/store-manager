const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM  products');

const getById = async (id) => {
  const [product] = await connection.execute('SELECT * FROM products WHERE id = ?', [id]);
  return product[0];
};

// return {
//   id,
//   name,
//   quantity,
// };

const getProductByName = (name) => connection.execute(
  'SELECT * FROM products WHERE name = ?', [name],
);

const createProduct = (name, quantity) => connection.execute(
  'INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity],
);

const updateProduct = (name, quantity, id) => { 
   connection.execute(
  'UPDATE products SET name = ?, quantity = ? WHERE id = ?', [name, quantity, id],
);
// return {
//   id: Number(id),
//   name, 
//   quantity,
// };
};

module.exports = {
  getAll,
  getById,
  getProductByName,
  createProduct,
  updateProduct,
};