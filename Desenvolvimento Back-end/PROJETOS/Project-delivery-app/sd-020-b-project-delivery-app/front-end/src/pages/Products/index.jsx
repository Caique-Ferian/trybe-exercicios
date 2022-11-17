import React, { useContext, useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Products.css';
import NavBar from '../../components/NavBar';
import ProductCard from '../../components/ProductCard';
import { AppContext } from '../../services/AppProvider';
import { requestGet, setToken } from '../../services/utils';

export default function Products() {
  const { totalCart } = useContext(AppContext);
  const [products, setProducts] = useState([]);
  const navigate = useNavigate();

  const handleCheckout = () => {
    if (totalCart > 0) {
      navigate('/customer/checkout');
    }
  };

  useEffect(() => {
    async function fetchData() {
      const userData = JSON.parse(localStorage.getItem('user')) ?? {};
      setToken(userData.token);
      const list = await requestGet('customer/products');
      setProducts(list);
    }
    fetchData();
  }, []);

  return (
    <div className="page">
      <NavBar />
      <div className="productsList">
        { products.map(({ id, price, urlImage, name }) => (
          <ProductCard
            id={ id }
            price={ price }
            urlImage={ urlImage }
            name={ name }
            key={ id }
          />
        )) }
      </div>
      <div className="cartWidget">
        {/* <div data-testid="customer_products__checkout-bottom-value"> */}
        <button
          type="button"
          className="cartBtn"
          onClick={ handleCheckout }
          data-testid="customer_products__checkout-bottom-value"
        >
          { totalCart.toFixed(2).replace('.', ',') }
        </button>

        <button
          type="button"
          className="cartBtn"
          disabled={ !totalCart }
          data-testid="customer_products__button-cart"
          onClick={ handleCheckout }
        >
          { totalCart.toFixed(2).replace('.', ',') }
        </button>
        {/* </div> */}
      </div>
    </div>
  );
}
