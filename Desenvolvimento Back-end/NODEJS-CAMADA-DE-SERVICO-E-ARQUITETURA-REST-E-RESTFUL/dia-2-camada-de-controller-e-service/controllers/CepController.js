const CepServices = require('../services/CepServices');

const getByCep = async (req, res,next) => {
    const {cep} = req.params;
    let data;
    if(cep.split('')[5] !== '-') {
        const cepToSearch = cep.replace(/(\d{5})(\d{3})/, '$1-$2')
        data = await CepServices.getByCep(cepToSearch);
    }
    data = await CepServices.getByCep(cep);
    if(data.error) return next(data);
    return res.status(200).json(data);
};

const createNewCep = async (req, res, next) => {
    const {cep,logradouro,bairro,localidade,uf} = req.body;
    const data = await CepServices.createNewCep({cep,logradouro,bairro,localidade,uf});
    if (data.error) return next(data);
    return res.status(201).json(data);
};

module.exports = {
    getByCep,
    createNewCep
};