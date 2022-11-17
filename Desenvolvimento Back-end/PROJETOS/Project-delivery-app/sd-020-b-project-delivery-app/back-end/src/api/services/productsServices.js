const { products } = require('../../database/models');

const getAll = () => products.findAll();

const getOne = (options) => products.findOne({ where: { ...options } });

module.exports = {
  getAll,
  getOne,
};
