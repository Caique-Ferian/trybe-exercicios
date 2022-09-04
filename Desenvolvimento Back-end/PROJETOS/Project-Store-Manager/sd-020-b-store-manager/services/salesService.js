const salesModel = require('../models/salesModel');
const validation = require('../helpers/validation'); 
const productsModel = require('../models/productsModel');

const serialize = (saleData) => {
  if (Object.keys(saleData).length === 4) {
    return {
      saleId: saleData.sale_id,
      date: saleData.date,
      productId: saleData.product_id,
      quantity: saleData.quantity,
    };
  }
  return {
    date: saleData.date,
    productId: saleData.product_id,
    quantity: saleData.quantity,
  };
};

const getAll = async () => {
  const data = await salesModel.getAll();
  return { code: 200, result: data.map(serialize) };
};

const getById = async (id) => {
  const data = await salesModel.getById(id);
  if (!data) return { code: 404, message: 'Sale not found' };
  return { code: 200, result: data.map(serialize) };
};
const create = async (arrayOfSales) => {
  const { code, message } = validation(arrayOfSales);
  if (message) return { code, message };
  const result = await Promise
    .all(arrayOfSales.map(({ productId }) => productsModel.getById(productId)));
  const ifValue = result.find((e) => e === null);
  if (ifValue === null) return { code: 404, message: 'Product not found' };
  const { insertId } = await salesModel.newSale();
  await Promise
    .all(arrayOfSales.map((e, index) => salesModel.create(e.quantity, insertId, result[index].id)));
  return { code, id: insertId };
};

module.exports = {
  getAll,
  getById,
  create,
  serialize,
};
