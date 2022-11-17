// const Joi = require('joi');

// const regexEmail = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/i;

// const loginSchema = Joi.object({
//   email: Joi.string().regex(regexEmail).required().messages({
//     'string.regex': 'é o email',
//   }),
//   password: Joi.string().min(6).required().messages({
//     'string.min': 'é a senha',
//   }),
// });

// const loginValidation = (req, res, next) => {
//   if (!req.body) return res.status(400).json({ error: 'É necessária passar requisição via body' });
//   const { error } = loginSchema.validate(req.body);
//   if (error) return res.status(400).json({ error: error.message });
//   next();
// };

// const validation = { 
//   loginValidation,
// };

// module.exports = validation;