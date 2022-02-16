require('../mocks/fetchSimulator');
const { fetchProducts } = require('../helpers/fetchProducts');
const computadorSearch = require('../mocks/search');

describe('1 - Teste a função fetchProducts', () => {
  // fail('Teste vazio');
  test('Verifica se fetchProducts é uma função.', () => {
    expect(typeof fetchProducts).toBe('function');
  });
  test('Verifica se fetchProducts ao passar o argumento "computador" se chama função fetch.', async () => {
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test('Verifica se fetchProducts ao passar o argumento "computador" se utiliza o endpoint igual ao argumento passado.', async () => {
    const url = 'https://api.mercadolibre.com/sites/MLB/search?q=computador';
    await fetchProducts('computador');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Verifica se o retorno da função fetchProducts é um objeto.', async () => {
    const result = await fetchProducts('computador');
    expect(result).toEqual(computadorSearch);
  });
  test('Verifica se ao chamar a função fetchProducts sem nenhum argumento, se um erro é retornado.', async () => {
    const result = await fetchProducts();
    expect(result).toEqual(new Error('You must provide an url'));
    //await expect(fetchProducts()).rejects.toEqual(new Error('You must provide an url')); -----> SEGUNDO MODO DE FAZER O TEST TAMBEM COMENTADO NO ARQUIVO FETCHPRODUCTS.JS 

  });
});
