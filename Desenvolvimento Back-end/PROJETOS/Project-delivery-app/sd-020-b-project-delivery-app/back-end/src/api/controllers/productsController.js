const productsServices = require('../services/productsServices');

const getAll = async (_req, res) => {
  const products = await productsServices.getAll();
  res.status(200).json(products);
};

module.exports = {
  getAll,
};
