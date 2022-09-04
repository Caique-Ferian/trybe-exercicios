
const verificaNumero = (number) => {
    if (number === 0) return 'neutro';
    if (number > 0) return 'positivo';
    if (number < 0) return 'negativo';
    return 'O parâmetro fornecido não é um número ou não foi fornecido o parâmetro';
};
module.exports = verificaNumero;