const rescue = require('./rescue');
const Joi = require('joi');
const { updateUser } = require('../models/User');

const userSchema = Joi.object({
    firstName: Joi.string().required(),
    lastName: Joi.string().required(),
    email: Joi.string().email().required(),
    password: Joi.string().min(6).required()
});

module.exports = [
    (req, res, next) => {
        const {error} = userSchema.validate(req.body);
        if (error) return next(error);
        next();
    },
    rescue(async (req, res, next) => {
        const {id} = req.params;
        const { firstName,lastName,email,password } = req.body;
        const newUser = await updateUser(id,{firstName,lastName,email,password});
        res.status(201).json(newUser);
    })
];