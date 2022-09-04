const Joi = require('joi');

module.exports = (req,_res,next) => {
    const {cep,logradouro,bairro,localidade,uf} = req.body;
    const {error} = Joi.object({
        cep: Joi.string().regex(/\d{5}-\d{3}/).required(),
        logradouro: Joi.string().not().empty().required(),
        bairro: Joi.string().not().empty().required(),
        localidade: Joi.string().not().empty().required(),
        uf: Joi.string().not().empty().required().length(2),
    }).validate({cep,logradouro,bairro,localidade,uf});
    if (error) {
        return next(error);
    }
    return next();
}