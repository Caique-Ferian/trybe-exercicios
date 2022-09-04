const productsModel = require('../models/productsModel');

const getAll = async () => ({ code: 200, result: await productsModel.getAll() });

const getById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return { code: 404, message: 'Product not found' };
  return { code: 200, result };
};

const create = async (name) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
 return {
    code: 422, message: '"name" length must be at least 5 characters long',
  }; 
}
  const { id } = await productsModel.create(name);
  return { code: 201, id };
};

const update = async (name, id) => {
  if (!name) return { code: 400, message: '"name" is required' };
  if (name.length < 5) {
 return {
    code: 422, message: '"name" length must be at least 5 characters long',
  }; 
}
  const result = await productsModel.getById(id);
  if (!result) return { code: 404, message: 'Product not found' };
  await productsModel.update(name, id);
  return { code: 200 };
};

const deleteById = async (id) => {
  const result = await productsModel.getById(id);
  if (!result) return { code: 404, message: 'Product not found' };
  await productsModel.deleteById(id);
  return { code: 204 };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};
