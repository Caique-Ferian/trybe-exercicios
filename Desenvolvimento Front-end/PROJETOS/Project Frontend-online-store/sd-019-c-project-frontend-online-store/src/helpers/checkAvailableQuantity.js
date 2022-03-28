const checkAvailableQuantity = (amount, qty) => {
  const result = amount < qty ? amount += 1 : amount;
  return result;
};

export default checkAvailableQuantity;
