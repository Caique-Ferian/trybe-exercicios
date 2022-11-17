import React, { useEffect, useState, useMemo } from 'react';
import PropTypes from 'prop-types';

const NEG1 = -1;
export const AppContext = React.createContext({});

function AppProvider({ children }) {
  const [cart, setCart] = useState(JSON.parse(localStorage.getItem('cart')) ?? []);
  const [totalCart, setTotalCart] = useState(0);

  useEffect(() => {
    setTotalCart(cart.reduce(
      (subtotal, item) => subtotal + parseFloat(item.price) * item.qtde,
      0,
    ));
  }, [cart]);

  const updateCart = (product, qtde) => {
    setCart((aCart) => {
      const newCart = aCart.filter((item) => item.id !== product.id);
      if (qtde > 0) newCart.push({ ...product, qtde });
      newCart.sort((a, b) => {
        if (b.id < a.id) return 1;
        return NEG1;
      });
      localStorage.setItem('cart', JSON.stringify(newCart));
      return newCart;
    });
  };

  const clearCart = () => {
    localStorage.removeItem('cart');
    setCart([]);
  };

  const getProductCart = (id) => {
    const cartId = cart.find((item) => item.id === id);
    if (!cartId) return null;
    return cartId;
  };

  const contextValue = useMemo(() => ({
    cart,
    updateCart,
    totalCart,
    getProductCart,
    clearCart,
  }), [cart, totalCart]);

  return (
    <AppContext.Provider value={ contextValue }>
      {children}
    </AppContext.Provider>
  );
}
AppProvider.propTypes = {
  children: PropTypes.element.isRequired,
};
export default AppProvider;
