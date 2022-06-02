const connection = require('./connection');

const getAll = () => connection.execute(
  `SELECT S.id AS "saleId", S.date AS "date", P.id AS "productId",
  S_P.quantity AS "quantity"
  FROM sales_products AS S_P
  INNER JOIN products AS P 
  ON P.id = S_P.product_id
  INNER JOIN sales AS S 
  ON S.id = S_P.sale_id`,
);

const getById = (id) => connection.execute(
  `SELECT 
  S.date AS "date", P.id AS "productId", 
  S_P.quantity AS "quantity" 
  FROM sales_products AS S_P 
  INNER JOIN products AS P ON P.id = S_P.product_id 
  INNER JOIN sales AS S ON S.id = S_P.sale_id
  WHERE S.ID = ?`, [id],
);

const createSale = () => connection.execute('INSERT INTO sales (date) VALUES (now());');
const createSalesProducts = (saleId, productId, quantity) => connection.execute(
  'INSERT INTO sales_products (sale_id, product_id, quantity) VALUES (?, ?, ?)',
  [saleId, productId, quantity],
);

module.exports = {
  getAll,
  getById,
  createSale,
  createSalesProducts,
};