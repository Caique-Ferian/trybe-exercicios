const connection = require('./connection');

const getByCep = async(cep) => {
    const query = 'SELECT cep, logradouro, bairro, localidade, uf FROM ceps WHERE cep = ?'
    const [result] = await connection.execute(query,[cep]);
    if(result.length === 0) return null;
    return result;
};
const createNewCep = async ({cep,logradouro,bairro,localidade,uf}) => {
    const cepEdited = cep.replace('-','');
    const query = `INSERT INTO ceps (cep,logradouro,bairro,localidade,uf)
    VALUES(?,?,?,?,?)`;
    await connection.execute(query,[cepEdited,logradouro,bairro,localidade,uf]);
};


module.exports = {
    getByCep,
    createNewCep
};