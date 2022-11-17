const salesServices = require('../services/salesServices');

const createSale = async (req, res) => {
  const { id: userId } = req.userData; // userData vem de validateToken
  const sale = req.body;
  // TODO - validar os campos do body para sale
  const response = await salesServices.create({ userId, ...sale });
  res.status(201).json(response);
};

const getOne = async (req, res) => {
  const { id: userId } = req.userData;
  const { id } = req.params;
  const response = await salesServices.listOne({ userId, id });
  res.status(200).json(response);
};

const getOneSeller = async (req, res) => {
  const { id } = req.params;
  const response = await salesServices.getOne(id);
  res.status(200).json(response);
};

const getAll = async (req, res) => {
  const { id: userId } = req.userData;
  const response = await salesServices.list({ userId });
  res.status(200).json(response);
};

const getAllSellers = async (req, res) => {
  const response = await salesServices.getAll();
  res.status(200).json(response);
};

module.exports = {
  createSale,
  getOne,
  getAll,
  getOneSeller,
  getAllSellers,
};
