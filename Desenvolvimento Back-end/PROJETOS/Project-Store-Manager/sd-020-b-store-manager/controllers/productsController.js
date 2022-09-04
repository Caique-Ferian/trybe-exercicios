const productsService = require('../services/productsService');

const getAll = async (_req, res) => {
  const { code, result } = await productsService.getAll();
  return res.status(code).json(result);
};

const getById = async (req, res) => {
  const { id } = req.params;
  const { code, result, message } = await productsService.getById(id);
  if (message) return res.status(code).json({ message });
  return res.status(code).json(result);
};

const create = async (req, res) => {
  const { name } = req.body;
  const { code, id, message } = await productsService.create(name);
  if (message) return res.status(code).json({ message });
  res.status(code).json({ id, name });
};

const update = async (req, res) => {
  const { id } = req.params;
  const { name } = req.body;
  const { code, message } = await productsService.update(name, id);
  if (message) return res.status(code).json({ message });
  res.status(code).json({ id, name });
};

const deleteById = async (req, res) => {
  const { id } = req.params;
  const { code, message } = await productsService.deleteById(id);
  if (message) return res.status(code).json({ message });
  res.status(code).end();
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};