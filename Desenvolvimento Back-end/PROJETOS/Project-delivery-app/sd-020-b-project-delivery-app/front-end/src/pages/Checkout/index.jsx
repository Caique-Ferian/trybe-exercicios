import React, { useContext } from 'react';
import { AppContext } from '../../services/AppProvider';
import NavBar from '../../components/NavBar';
import CartList from '../../components/CartList';
import AddressComponent from './AddressComponent';
import './checkout.css';

export default function Checkout() {
  const { cart, updateCart, totalCart } = useContext(AppContext);

  return (
    <div className="checkoutPage">
      <NavBar />
      <div className="contentPage">
        <h3>Finalizar Pedido</h3>
        <section>
          <CartList
            allowRemove="true"
            cart={ cart }
            updateCart={ updateCart }
            totalCart={ totalCart }
            dataTest="customer_checkout"
          />
        </section>

        <h3>Detalhes e Endereço para Entrega</h3>
        <section>
          <AddressComponent
            totalCart={ totalCart }
            cart={ cart }
          />
        </section>
      </div>
    </div>
  );
}
