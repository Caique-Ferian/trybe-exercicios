const validation = (arrayOfSales) => {
  if (arrayOfSales.find(({ productId }) => !productId)) {
    return { code: 400, message: '"productId" is required' };
  }
  if (arrayOfSales.find((e) => e.quantity === undefined)) {
    return { code: 400, message: '"quantity" is required' };
  }
  if (arrayOfSales.find((e) => e.quantity < 1)) {
    return { code: 422, message: '"quantity" must be greater than or equal to 1' };
  }
  return { code: 201 };
};

module.exports = validation;