module.exports = (req,_res,next) => {
    let {cep} = req.params;
    const cepRegex = /^\d{5}-?\d{3}$/;
    if (cepRegex.test(cep)) return next();
    return next({
        error: {
            code: 'invalidData',
            message: 'CEP inválido'
        }
    });
}