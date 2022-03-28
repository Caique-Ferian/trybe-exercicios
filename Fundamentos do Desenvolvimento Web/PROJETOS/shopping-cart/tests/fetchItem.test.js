require('../mocks/fetchSimulator');
const { fetchItem } = require('../helpers/fetchItem');
const item = require('../mocks/item');

describe('2 - Teste a função fetchItem', () => {
  // fail('Teste vazio');
  test('Verifica se fetchItem é uma função.', () => {
    expect(typeof fetchItem).toBe('function');
  });
  test('Verifica se fetchItem ao passar o argumento "MLB1615760527" se chama função fetch.', async () => {
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledTimes(1);
  });
  test('Verifica se fetchItem ao passar o argumento "MLB1615760527" se utiliza o endpoint igual ao argumento passado.', async () => {
    const url = 'https://api.mercadolibre.com/items/MLB1615760527'
    await fetchItem('MLB1615760527');
    expect(fetch).toHaveBeenCalledWith(url);
  });
  test('Verifica se o retorno da função fetchItem é um objeto.', async () => {
    const result = await fetchItem('MLB1615760527');
    expect(result).toEqual(item);
  });
  test('Verifica se ao chamar a função fetchItem sem nenhum argumento, se um erro é retornado.', async () => {
    const result = await fetchItem();
    expect(result).toEqual(new Error('You must provide an url'));

  });
});
