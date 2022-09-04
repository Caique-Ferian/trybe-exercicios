const salesService = require('../services/salesService');

const getAll = async (_req, res) => {
  const { code, result } = await salesService.getAll();
  return res.status(code).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, result, message } = await salesService.getById(id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(result);
};

const create = async (req, res) => {
  const itemsSold = req.body;
  const { code, id, message } = await salesService.create(itemsSold);
  if (message) return res.status(code).json({ message });
  res.status(code).json({ id, itemsSold });
};

module.exports = {
  getAll,
  getById,
  create,
};