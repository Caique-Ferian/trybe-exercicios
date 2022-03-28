import increaseQty from './increaseQty';
import checkAvailableQuantity from './checkAvailableQuantity';

export default function increaseItemOnCart({ target }) {
  const cartItems = JSON.parse(localStorage.getItem('cartItems'));
  const arr = cartItems.map((item) => {
    const a = item.id === target.parentNode.id
      ? ({ ...item,
        amount: target.name === '+'
          ? checkAvailableQuantity(item.amount, item.availableQuantity)
          : item.amount -= 1 })
      : item;
    return a;
  });
  localStorage.setItem('cartItems', JSON.stringify(arr));
  localStorage.setItem('qty', JSON.stringify(increaseQty()));
}
