import increaseQty from './increaseQty';
import checkAvailableQuantity from './checkAvailableQuantity';

function addProductToCart(infos) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  infos.amount += 1;
  let toSave = [];
  if (cartItems) {
    const cartItem = cartItems.find((item) => item.id === infos.id);
    if (cartItem) {
      toSave = cartItems.map((item) => {
        const a = item.id === infos.id
          ? ({
            ...item,
            amount:
              checkAvailableQuantity(item.amount, item.availableQuantity),
          })
          : item;
        return a;
      });
    } else {
      toSave = [...cartItems, infos];
    }
  } else {
    toSave = [infos];
  }
  localStorage.setItem('cartItems', JSON.stringify(toSave));
  localStorage.setItem('qty', JSON.stringify(increaseQty()));
}

export default addProductToCart;
