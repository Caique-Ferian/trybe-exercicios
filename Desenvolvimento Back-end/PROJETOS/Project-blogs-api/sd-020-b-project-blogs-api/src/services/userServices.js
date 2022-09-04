const Joi = require('joi');
const { User } = require('../database/models');
const { createJWT } = require('../middlewares');

const validateBody = (body) => Joi.object({
        displayName: Joi.string().min(8).required(),
        email: Joi.string().email().required(),
        password: Joi.string().min(6).required(),
    }).validate(body);

const create = async ({ displayName, email, password, image }) => {
    const { error } = validateBody({ displayName, email, password });
    if (error) {
        error.code = 'invalidData';
        return { error };
    }
    const findUser = await User.findOne({ where: { email } });
    if (findUser) { 
        return { 
            error: { code: 'alreadyExists', message: 'User already registered' },
        };
    }
    const { id } = await User.create({ displayName, email, password, image });
    const payload = { id, displayName, email, image };
    const token = createJWT(payload);
    return { code: 201, token };
};

const getAll = async () => {
    const users = await User.findAll({ attributes: { exclude: ['password'] } });
    return { code: 200, users };
};

const getById = async (id) => {
    const user = await User.findOne({
        where: { id },
        attributes: { exclude: ['password'] }, 
    });
    if (!user) {
        return {
            error: { code: 'notFound', message: 'User does not exist' },
        };
    }
    return { code: 200, user };
};

const destroy = async (id) => {
    await User.destroy({ where: { id } });
    return { code: 204 };
};

module.exports = {
    create,
    getAll,
    getById,
    destroy,
};