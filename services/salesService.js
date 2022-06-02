const salesModel = require('../models/salesModel');

const getSales = async () => {
  const [sales] = await salesModel.getAll();
  return sales;
};

const getSaleById = async (id) => {
  const [sale] = await salesModel.getById(id);
  if (!sale.length) {
    return {
      error: true,
      message: 'Sale not found',
    };
  }
  return sale;
};

const createSale = async (sales) => {
  console.log('?', sales); // undefined?
  const saleId = await salesModel.createSale();
  const { insertId } = saleId;
  await sales.map(({ productId, quantity }) => salesModel.createSalesProducts(
    saleId, productId, quantity,
  ));   
  return {
    id: insertId,
    itemSold: sales,
  };
  };

module.exports = {
  getSales,
  getSaleById,
  createSale,
};