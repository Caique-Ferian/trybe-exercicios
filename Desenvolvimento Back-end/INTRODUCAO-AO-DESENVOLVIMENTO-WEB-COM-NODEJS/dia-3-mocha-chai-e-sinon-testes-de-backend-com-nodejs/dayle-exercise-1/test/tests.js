const { expect } = require('chai');
const verificaNumero = require('../verificaNumero');

describe('Executa a função que verifica números', () => {
    describe('Quando é informado um número', () => {
        it('Verifica se o retorno da função é uma string', () => {
            const result = verificaNumero(1);
            expect(result).to.be.a('string');
        });

        it('Verifica se o retorno da função é "positivo", ao informar um número positivo', () => {
            const result = verificaNumero(10);
            expect(result).to.be.equals('positivo');
        });
        
        it('Verifica se o retorno da função é "negativo" ao informar um número negativo', () => {
            const result = verificaNumero(-15);
            expect(result).to.be.equals('negativo');
        });

        it('Verifica se o retorno da função é "neutro" se o número informado for "Zero"', () => {
            const result = verificaNumero(0);
            expect(result).to.be.equals('neutro');
        });
        
        
    });
        describe('Quando não é informado um número', () => {
            it('Erro ao chamar a função sem nenhum parâmetro', () => {
                const result = verificaNumero();
                expect(result).to.be.equals('O parâmetro fornecido não é um número ou não foi fornecido o parâmetro');
            });
            it('Erro ao informar algo diferente de número', () => {
                const result = verificaNumero('a');
                expect(result).to.be.equals('O parâmetro fornecido não é um número ou não foi fornecido o parâmetro');
            });
        });
});