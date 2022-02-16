const itemsContainer = document.querySelector('.items');
const cartContainer = document.querySelector('.cart__items');
const list = document.querySelector('.cart__items');
const showTotal = document.querySelector('.total-price');
let calculateTotal = 0;
function createProductImageElement(imageSource) {
  const img = document.createElement('img');
  img.className = 'item__image';
  img.src = imageSource;
  return img;
}

function createCustomElement(element, className, innerText) {
  const e = document.createElement(element);
  e.className = className;
  e.innerText = innerText;
  return e;
}

function createProductItemElement({ sku, name, image }) {
  const section = document.createElement('section');
  section.className = 'item';

  section.appendChild(createCustomElement('span', 'item__sku', sku));
  section.appendChild(createCustomElement('span', 'item__title', name));
  section.appendChild(createProductImageElement(image));
  section.appendChild(createCustomElement('button', 'item__add', 'Adicionar ao carrinho!'));
  
  return section;
}
function cartClear() {
  const emptyButton = document.querySelector('.empty-cart');
  const listElements = list.childNodes;
  emptyButton.addEventListener('click', () => {
    for (let index = 0; index < listElements.length; index += 1) {
      list.removeChild(listElements[index]);
    }
    showTotal.innerText = '0,00';
    localStorage.removeItem('cartItems');
    localStorage.setItem('total', '0,00');
    cartContainer.innerHTML = '';
  });
}
const calculateSubTotal = async (price) => {
  if (calculateTotal > 0) {
    showTotal.innerText = `${price}`;
    return showTotal;
  }
  showTotal.innerText = '0,00';
  return showTotal;
};

async function cartItemClickListener(event) {
  const price = event.target.innerText.split(' ')[event.target.innerText.split(' ').length - 1]
    .split('').splice(1, 5).join('');
  list.removeChild(event.target);
  await calculateSubTotal(calculateTotal -= price);
  localStorage.setItem('total', calculateTotal);
  saveCartItems(cartContainer.innerHTML);
}

function createCartItemElement({ sku, name, salePrice, image }) {
  const li = document.createElement('li');
  // const createButton = document.createElement('button');
  // createButton.innerText = 'X';
  // createButton.className = 'remove__item';
  li.className = 'cart__item';
  li.innerText = `SKU: ${sku} | NAME: ${name} | PRICE: $${salePrice}`;
  // li.innerText = `${name}  R$${salePrice}`;
  li.appendChild(createProductImageElement(image));
  // li.appendChild(createButton);
  li.addEventListener('click', cartItemClickListener);
  return li;
}
const arrayCart = (fetchResult) => {
  const elementId = fetchResult.id;
  const elementName = fetchResult.title;
  const elementPrice = fetchResult.price;
  const elementImage = fetchResult.thumbnail;
  const object = { sku: elementId, 
    name: elementName, 
    salePrice: elementPrice,
    image: elementImage,
  };
  return object;
};
const arrayProducts = (fetchResult) => {
  const elementsIds = fetchResult.results.map((element) => element.id);
  const elementsNames = fetchResult.results.map((element) => element.title);
  const elementsImages = fetchResult.results.map((element) => element.thumbnail);
  const results = [];
  for (let index = 0; index < elementsIds.length; index += 1) {
    const object = { sku: elementsIds[index], 
      name: elementsNames[index], 
      image: elementsImages[index] };
      results.push(object);
    }
  return results;
};
// Feito com ajuda do repositorio de Thiago Santa Clara Pereira.
// async function showLoading() {
//   const loading = document.querySelector('.loading');
//   fetchProducts('computador')
//   .then((result) => {
//       const products = arrayProducts(result);
//       for (let index = 0; index < products.length; index += 1) {
//         itemsContainer.appendChild(createProductItemElement(products[index]));
//       }
//   })
//   .finally(() => loading.remove());
// }
 function showLoading(time) {
  // Feito com ajuda do site https://pt.stackoverflow.com/questions/63641/como-fazer-uma-tela-de-loading-antes-de-abrir-o-site
  const i = setInterval(function () {
    clearInterval(i);
    document.querySelector('.loading').remove();
}, time);
}
const cartItems = () => {
  itemsContainer.addEventListener('click', async (event) => {
    if (event.target.className === 'item__add') {
      const idSelected = event.target.previousSibling.previousSibling.previousSibling.innerText;
      const cart = await fetchItem(idSelected);
      const cartItem = arrayCart(cart);
      cartContainer.appendChild(createCartItemElement(cartItem));
      saveCartItems(cartContainer.innerHTML);
      await calculateSubTotal(calculateTotal += cart.price);
      localStorage.setItem('total', calculateTotal);
      cartClear();
    }
  });
};

const loadLocalStorage = () => {
  if (localStorage.getItem('total') === null) {
    localStorage.setItem('total', '0,00');
  }
  const childs = cartContainer.childNodes;
  cartContainer.innerHTML = getSavedCartItems();
  for (let index = 0; index < childs.length; index += 1) {
    childs[index].addEventListener('click', cartItemClickListener);   
  }
  calculateTotal = parseFloat(localStorage.getItem('total'));
  if (calculateTotal === 0) {
    showTotal.innerText = '0,00';  
  } else {  
    showTotal.innerText = localStorage.getItem('total');
  }
  cartClear();
};

window.onload = async () => {
  loadLocalStorage();
  const result = await fetchProducts('computador');
  const products = arrayProducts(result);
  showLoading(result);
  for (let index = 0; index < products.length; index += 1) {
    itemsContainer.appendChild(createProductItemElement(products[index]));
  }
  cartItems();
};
