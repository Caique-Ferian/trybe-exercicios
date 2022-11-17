const Sequelize = require('sequelize');
const createJWT = require('../middleware/createJWT');
const { generateHash } = require('../utils/passwordMd5');
const { users } = require('../../database/models');

const { Op } = Sequelize;

const login = async ({ email, password }) => {
  const user = await users.findOne({ where: { email } });

  if (!user) return null;

  if (generateHash(password) !== user.password) return null;

  const token = createJWT({
    email: user.email,
    id: user.id,
    role: user.role,
  });

  return {
    id: user.id,
    name: user.name,
    email: user.email,
    role: user.role,
    token,
  };
};

const register = async ({ name, email, password, role }) => {
  const hasUserByEmail = await users.findOne({ where: { email } });
  const hasUserByName = await users.findOne({ where: { name } });
  if (hasUserByEmail || hasUserByName) return null;
  await users.create({ name, email, password: generateHash(password), role });
  const token = createJWT({ email });

  return { name, email, role, token };
};

const findAll = async () => users.findAll({ where: { email: { [Op.ne]: 'adm@deliveryapp.com' } } });

const list = (options) => users.findAll({ where: { ...options } });

const destroy = async (id) => users.destroy({ where: { id } });

module.exports = { login, register, list, findAll, destroy };