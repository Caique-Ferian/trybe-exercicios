// apiScript.js
const API_URL = 'https://api.coincap.io/v2/assets';
const API_URL_2 = 'https://cdn.jsdelivr.net/gh/fawazahmed0/currency-api@1/latest/currencies/usd.min.json'


// const fetchCoin = () => {

//   fetch(API_URL)
//     .then((response) => response.json())
//     .then((data) => {
//       const container = document.getElementById('coinContainer');
//       console.log(data);
//       for(let index = 0; index < data.data.length; index += 1){
//         const list = document.createElement('li');
//         list.innerText = `${data.data[index].name} (${data.data[index].symbol}): ${data.data[index].priceUsd}.`
//         container.appendChild(list);

//       }

//     });
// }; Mostra todas coins

const fetchCoin = () => {
  let value;
  fetch(API_URL_2)
    .then((response) => response.json())
    .then((data) => {
      value = data.usd.brl;
    });

  fetch(API_URL)
    .then((response) => response.json())
    .then((data) => {
      const container = document.getElementById('coinContainer');
      const filterApi = data.data.filter((element) => element.rank <= 10);
      for(let index = 0; index < filterApi.length; index += 1){
        const list = document.createElement('li');
        list.innerText = `${filterApi[index].name} (${filterApi[index].symbol}): ${filterApi[index].priceUsd *value}.`
        container.appendChild(list);
      }
    }); // mostra as 10 primeiras.
};

window.onload = () => fetchCoin();
