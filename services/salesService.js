const salesModel = require('../models/salesModel');

const getSales = async () => {
  const [sale] = await salesModel.getAll();
  return sale;
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

module.exports = {
  getSales,
  getSaleById,
};