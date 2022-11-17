const {
  sales,
  salesProducts,
  users,
  products,
  sequelize,
} = require('../../database/models');
const CustomError = require('../utils/CustomError');
const productsServices = require('./productsServices');

const calculateTotalPrice = async (productsList) => {
  const pricesPromises = productsList.map(async (product) => {
    const res = await productsServices.getOne({ id: product.productId });

    if (!res) throw new CustomError({ code: 404, message: 'product not found' });
    return res.price * product.quantity;
  });
  const arrPrices = await Promise.all(pricesPromises);
  const total = arrPrices.reduce((acc, subtotal) => acc + subtotal, 0);
  return total;
};

const createSale = (saleData, totalPrice, status, t) => {
  const { userId, sellerId, deliveryAddress, deliveryNumber } = saleData;

  return sales.create({
    userId,
    sellerId,
    totalPrice,
    deliveryAddress,
    deliveryNumber,
    status,
  }, { transaction: t });
};

const createSalesProducts = (productsList, saleId, t) => {  
  const promises = productsList.map((item) => salesProducts.create({
    saleId,
    productId: item.productId,
    quantity: item.quantity,
  }, { transaction: t }));

  return Promise.all(promises);
};

const create = async (saleData) => {
  const { products: productsList } = saleData;

  const totalPrice = await calculateTotalPrice(productsList);
  const t = await sequelize.transaction();

  try {
    const { id } = await createSale(saleData, totalPrice, 'Pendente', t);
    await createSalesProducts(productsList, id, t);  
    await t.commit();
    return { id };
  } catch (error) {
    await t.rollback();
    throw new CustomError({ code: 403, message: error.message });
  }
};

const listOne = async (options) => {
  const sale = await sales.findOne({
    where: { ...options },
    include: [
      { model: users, as: 'user', attributes: ['id', 'name', 'email'] },
      { model: users, as: 'seller', attributes: ['id', 'name', 'email'] },
      {
        model: products,
        as: 'products',
        through: { attributes: ['quantity'] },
      },
    ],
    attributes: { exclude: ['userId', 'sellerId'] },
  });
  if (!sale) throw new CustomError({ code: 404, message: 'sale not found' });

  return sale;
};

const list = async (options) => {
  const saleList = await sales.findAll({
    where: { ...options },
    include: [
      { model: users, as: 'user', attributes: ['id', 'name', 'email'] },
      { model: users, as: 'seller', attributes: ['id', 'name', 'email'] },
    ],
    attributes: { exclude: ['userId', 'sellerId'] },
  });

  return saleList;
};

const getAll = async () => {
  const eita = await sales.findAll();
  return eita;
};

module.exports = {
  create,
  listOne,
  list,
  getAll,
};
