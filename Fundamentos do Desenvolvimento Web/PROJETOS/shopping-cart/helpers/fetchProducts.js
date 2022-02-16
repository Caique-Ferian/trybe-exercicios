const fetchProducts = async (QUERY) => {
  const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
  try {
    const response = await fetch(url);
    const data = await response.json();
    return data;
  } catch (error) {
    return error;
  }
};
// const fetchProducts = async (QUERY) => {
//     const url = `https://api.mercadolibre.com/sites/MLB/search?q=${QUERY}`;
//     if (url.endsWith('undefined')) {
//       throw new Error('You must provide an url');
//     } 
//     const response = await fetch(url);
//     const data = await response.json();
//     return data;
//   }; SEGUNDO MODO DE FAZER COM O TEST TAMBEM COMENTADO NO ARQUIVO FETCHPRODUCTS.TEST.JS
if (typeof module !== 'undefined') {
  module.exports = {
    fetchProducts,
  };
}