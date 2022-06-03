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
  const saleId = await salesModel.createSale();
  const [{ insertId }] = saleId;
  await Promise.all(sales.map(({ productId, quantity }) => salesModel.createSalesProducts(
    insertId, productId, quantity,
  )));   
  return {
    id: insertId,
    itemsSold: sales,
  };
  };

module.exports = {
  getSales,
  getSaleById,
  createSale,
};