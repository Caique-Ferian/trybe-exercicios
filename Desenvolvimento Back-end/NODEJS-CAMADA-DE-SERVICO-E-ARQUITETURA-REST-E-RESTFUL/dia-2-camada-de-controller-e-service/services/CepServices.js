const CepModel = require('../model/CepModel');

const getByCep = async (cep) => {
    const cepToSearch = cep.replace('-','');
    const result = await CepModel.getByCep(cepToSearch);
    if(!result) {
        return {
            error: {
                code: 'notFound',
                message: 'CEP não encontrado'
            }
        };
    } 
    return result[0];
};
const createNewCep = async ({cep,logradouro,bairro,localidade,uf}) => {
    const ifExists = await getByCep(cep);
    if(ifExists.cep) {
        console.log('passou aqui');
        return {
            error: { code: 'alreadyExists', message: 'CEP já existente' }
          }
    }
    await CepModel.createNewCep({cep,logradouro,bairro,localidade,uf});
    return {cep,logradouro,bairro,localidade,uf};
};

module.exports = {
    getByCep,
    createNewCep,
}