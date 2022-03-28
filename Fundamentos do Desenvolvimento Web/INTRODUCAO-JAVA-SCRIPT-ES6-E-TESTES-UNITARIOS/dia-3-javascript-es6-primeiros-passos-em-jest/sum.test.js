const sum = require('./sum');

describe('Verifica se a funcao realiza soma corretamente', () =>{

    test('Verifica se ao chamar sum(4,5) o retorno sera 9', () => {
        expect(sum(4,5)).toBe(9);
    });
    test('Verifica se ao chamar sum(0,0) o retorno sera 0', () => {
        expect(sum(0,0)).toBe(0);
    });
    test('Verifica se ao chamar sum(4,"5") retorna um fluxo de excessao', () => {
        expect(()=> sum(4,"5")).toThrow();
    });
    test('Verifica se a mensagem de erro e  "parameters must be numbers"', () => {
        expect(()=> sum(4,"5")).toThrowError(new Error('parameters must be numbers'));
    });

});