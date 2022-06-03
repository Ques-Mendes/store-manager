const salesService = require('../services/salesService');
const { HTTP_OK, HTTP_NOT_FOUND } = require('../helpers/codes');

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();
  res.status(HTTP_OK).json(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSaleById(id);
  if (!sales.length) {
    return res.status(HTTP_NOT_FOUND).json({ message: sales.message });
  }
  return res.status(HTTP_OK).json(sales);
};

const createSale = async (req, res) => {
  const saleCreated = await salesService.createSale(req.body);
  console.log('salecreated0', saleCreated);
  if (saleCreated.error) {
    return res.status(400).json({ message: saleCreated.error });
  }
  res.status(201).json(saleCreated);
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
};