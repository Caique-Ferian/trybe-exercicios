const Joi = require('joi');
const { Category } = require('../database/models');

const validateName = (body) => Joi.object({
        name: Joi.string().required().messages({
            'string.required': '"name" is required',
        }),
    }).validate(body);

const create = async (body) => {
    const { error } = validateName(body);
    if (error) {
        error.code = 'invalidData';
        return { error };
    }
    const newCategory = await Category.create({ name: body.name }); 
    return { code: 201, newCategory };
};

const getAll = async () => {
    const categories = await Category.findAll();
    return { code: 200, categories };
};

module.exports = {
    create,
    getAll,
};