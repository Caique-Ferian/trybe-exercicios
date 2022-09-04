const categoryService = require('../services/categoryServices');

const create = async (req, res, next) => {
    const { error, code, newCategory } = await categoryService.create(req.body);
    if (error) return next(error);
    return res.status(code).json(newCategory);
};

const getAll = async (_req, res) => {
    const { code, categories } = await categoryService.getAll();
    return res.status(code).json(categories);
};

module.exports = {
    create,
    getAll,
};