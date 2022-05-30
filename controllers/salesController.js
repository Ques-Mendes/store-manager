const salesService = require('../services/salesService');
const { HTTP_OK, HTTP_NOT_FOUND } = require('../helpers/codes');

const getSales = async (_req, res) => {
  const sales = await salesService.getSales();
  res.status(HTTP_OK).jason(sales);
};

const getSalesById = async (req, res) => {
  const { id } = req.params;
  const sales = await salesService.getSaleById(id);
  if (sales.error) {
    return res.status(HTTP_NOT_FOUND).json({ message: sales.message });
  }
  res.status(HTTP_OK).json(sales);
};

module.exports = {
  getSales,
  getSalesById,
};