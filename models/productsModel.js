const connection = require('./connection');

const getAll = () => connection.execute('SELECT * FROM  products');

const getById = (id) => connection.execute('SELECT * FROM products WHERE id = ?', [id]);

const getProductByName = (name) => connection.execute(
  'SELECT * FROM products WHERE name = ?', [name],
);

const createProduct = (name, quantity) => connection.execute(
  'INSERT INTO products (name, quantity) VALUES (?, ?)', [name, quantity],
);

module.exports = {
  getAll,
  getById,
  getProductByName,
  createProduct,
};