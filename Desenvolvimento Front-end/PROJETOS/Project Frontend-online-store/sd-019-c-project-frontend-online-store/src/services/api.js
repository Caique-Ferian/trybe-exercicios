// primeiro requisito feito com todo grupo em pair programming

export async function getCategories() {
  const URL = 'https://api.mercadolibre.com/sites/MLB/categories';
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function getProductsFromCategoryAndQuery(query, categoryId) {
  const URL = `https://api.mercadolibre.com/sites/MLB/search?category=${categoryId || ''}&q=${query || ''}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
}

export async function getProductFromId(productId) {
  const URL = `https://api.mercadolibre.com/items/${productId}`;
  try {
    const response = await fetch(URL);
    const data = await response.json();
    return data;
  } catch (err) {
    console.log(err);
    return {};
  }
}
