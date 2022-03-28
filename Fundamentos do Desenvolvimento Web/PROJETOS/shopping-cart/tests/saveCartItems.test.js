const localStorageSimulator = require('../mocks/localStorageSimulator');
const saveCartItems = require('../helpers/saveCartItems');

localStorageSimulator('setItem');

describe('4 - Teste a função saveCartItems', () => {
  beforeEach(() => saveCartItems('<ol><li>Item</li></ol>'));
  test('Verifica se saveCartItems ao passar o argumento "<ol><li>Item</li></ol>" se chama função localStorage.setItem.',  () => {
    expect(localStorage.setItem).toHaveBeenCalledTimes(1);
  });  
  test('Verifica se saveCartItems ao passar o argumento "<ol><li>Item</li></ol>" se a função localStorage.setItem tem 2 parâmetros',  () => {
    expect(localStorage.setItem).toHaveBeenCalledWith('cartItems','<ol><li>Item</li></ol>');
  });  
});
