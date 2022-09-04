const connection = require('./connection');

const getAll = async () => {
  const query = `SELECT sp.sale_id, s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id`;
  const [sales] = await connection.execute(query);
  return sales;
};

const getById = async (id) => {
  const query = `SELECT s.date, sp.product_id, sp.quantity
  FROM StoreManager.sales_products AS sp
  INNER JOIN StoreManager.sales AS s
  ON sp.sale_id = s.id
  WHERE sp.sale_id = ?`;
  const [sale] = await connection.execute(query, [id]);
  if (sale.length === 0) return null;
  return sale;
};

const newSale = async () => {
  const query = 'INSERT INTO StoreManager.sales (date) VALUES (NOW())';
  const [{ insertId }] = await connection.execute(query);
  return { insertId };
};

const create = async (quantity, insertId, productId) => {
  const query = `INSERT INTO StoreManager.sales_products (sale_id,product_id,quantity)
   VALUES (?,?,?)`;
  await connection.execute(query, [insertId, productId, quantity]);
  return { quantity, insertId, productId };
};

module.exports = {
  getAll,
  getById,
  newSale,
  create,
};