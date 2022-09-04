const userService = require('../services/userServices');

const create = async (req, res, next) => {
    const { error, code, token } = await userService.create(req.body);
    if (error) return next(error);
    req.headers.authorization = token;
    return res.status(code).json({ token });
};

const getAll = async (_req, res) => {
    const { code, users } = await userService.getAll();
    return res.status(code).json(users);
};

const getById = async (req, res, next) => {
    const { id } = req.params;
    const { error, code, user } = await userService.getById(id);
    if (error) return next(error);
    return res.status(code).json(user);
};

const destroy = async (req, res) => {
    const { id } = req.user;
    const { code } = await userService.destroy(id);
    return res.status(code).end();
};

module.exports = {
    create,
    getAll,
    getById,
    destroy,
};