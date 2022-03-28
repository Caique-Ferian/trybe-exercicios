const { expect } = require("@jest/globals");
const { getPokemonDetails } = require("./script-5.js");

describe("A função getPokemonDetails", () => {
  it("retorna erro quando procuramos um pokemon que não existe no banco de dados", (done) => {
    const expectedError = new Error ('Não temos esse pokémon para você :(');
    getPokemonDetails((pokemon) => pokemon.name === 'Pikachu', (error, message) => {
        expect(error).toEqual(expectedError);   
        done();
    });
  });

  it("retorna um pokemon que existe no banco de dados", (done) => {
    const expectedResult = 'Olá, seu pokémon é o Charmander, o tipo dele é Fire e a habilidade principal dele é Ember';
    getPokemonDetails((pokemon) => pokemon.name === 'Charmander', (error, message) => {
        expect(message).toEqual(expectedResult);   
        done();
    });
  });
});