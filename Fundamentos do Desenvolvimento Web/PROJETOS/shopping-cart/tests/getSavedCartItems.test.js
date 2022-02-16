const localStorageSimulator = require('../mocks/localStorageSimulator');
const getSavedCartItems = require('../helpers/getSavedCartItems');

localStorageSimulator('getItem');

describe('4 - Teste a função getSavedCartItems', () => {
  beforeEach(() => getSavedCartItems());
  test('Verifica se getSavedCartItems chama a função localStorage.getItem.',  () => {
    expect(localStorage.getItem).toHaveBeenCalled();
  });  
  test('Verifica se getSavedCartItems chama a função localStorage.getItem com argumento "cartItems".',  () => {
    expect(localStorage.getItem).toHaveBeenCalledWith('cartItems');
  });  
  // fail('Teste vazio');
});
