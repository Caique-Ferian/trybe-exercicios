import React, { useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import './NavBar.css';
import { AuthContext } from '../services/AuthProvider';

export default function NavBar() {
  const { user, logout } = useContext(AuthContext);
  const navigate = useNavigate();
  const navigateTo = (path) => {
    navigate(path);
  };

  return (
    <nav>
      <div className="nav-products">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-products"
          onClick={ () => navigateTo('/customer/products') }
        >
          PRODUTOS
        </button>
      </div>
      <div className="nav-cart">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-orders"
          onClick={ () => navigateTo('/customer/orders') }
        >
          MEUS PEDIDOS
        </button>
      </div>
      <div className="nav-user">
        <p
          data-testid="customer_products__element-navbar-user-full-name"
        >
          { user.name }
        </p>
      </div>
      <div className="nav-logout">
        <button
          type="button"
          data-testid="customer_products__element-navbar-link-logout"
          onClick={ logout }
        >
          Sair
        </button>
      </div>
    </nav>
  );
}
