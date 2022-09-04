const connection = require('./connection');

const getAll = async () => {
  const query = 'SELECT id,name FROM StoreManager.products ORDER BY id';
  const [products] = await connection.execute(query);
  return products;
};

const getById = async (id) => {
  const query = 'SELECT id,name FROM StoreManager.products WHERE id = ?';
  const [product] = await connection.execute(query, [id]);
  if (product.length === 0) return null;
  return product[0];
};

const create = async (name) => {
  const query = 'INSERT INTO StoreManager.products (name) VALUES (?)';
  const [productAdded] = await connection.execute(query, [name]);
  return { id: productAdded.insertId };
};

const update = async (name, id) => {
  const query = 'UPDATE StoreManager.products SET name = ? WHERE id = ?';
  await connection.execute(query, [name, id]);
  return { name, id };
};

const deleteById = async (id) => {
  const query = 'DELETE FROM StoreManager.products WHERE id = ?';
  await connection.execute(query, [id]);
  return { id };
};

module.exports = {
  getAll,
  getById,
  create,
  update,
  deleteById,
};