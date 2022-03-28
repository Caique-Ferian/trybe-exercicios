const increaseQty = () => {
  const cartQty = JSON.parse(localStorage.getItem('cartItems'));
  const qty = cartQty ? cartQty.reduce((acc, { amount }) => acc + amount, 0) : 1;
  return qty;
};

export default increaseQty;
