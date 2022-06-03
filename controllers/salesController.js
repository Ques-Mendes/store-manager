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
  res.status(201).json(saleCreated);
};

const updateSale = async (req, res) => {
  const { id } = req.params;
  // const sales = req.body;
  const saleUpdated = await salesService.updateSale(id, req.body);
  if (saleUpdated.error) {
    return res.status(HTTP_NOT_FOUND).json({ message: saleUpdated.message });
  }
  res.status(200).json(saleUpdated);
};

module.exports = {
  getSales,
  getSalesById,
  createSale,
  updateSale,
};