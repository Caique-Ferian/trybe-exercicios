const userService = require('../services/userServices');

// const login = async (req, res) => {
//   const user = await userService.login(req.body);

//   if (!user) return res.status(404).json({ error: 'Usuário ou senha incorretos' });

//   return res.status(200).json(user);
// };

const login = async (req, res, next) => {
  const user = await userService.login(req.body);

  if (!user) return next({ code: 'notFound', message: 'Usuário ou senha incorretos' });
  if (!req.headers.authorization) req.headers.authorization = user.token;
  console.log(req.headers.authorization);    

  return res.status(200).json(user);
};

const register = async (req, res, next) => {
  const user = await userService.register(req.body);
  if (!user) {
      return next({ 
          code: 'alreadyExists', message: 'Email ou Nome já existentes no banco de dados' });
  }
  return res.status(201).json(user);
};

const findAll = async (_req, res, _next) => {
  const users = await userService.findAll();
  return res.status(200).json(users);
};

const destroy = async (req, res, _next) => {
  await userService.destroy(req.params.id);
  return res.status(204).end();
};

const getSellers = async (_req, res) => {
  const list = await userService.list({ role: 'seller' });
  return res.status(200).json(list);
};

module.exports = { login, register, getSellers, findAll, destroy };