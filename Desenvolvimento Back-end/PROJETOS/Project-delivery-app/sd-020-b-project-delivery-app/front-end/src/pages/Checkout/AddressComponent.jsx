import React, { useEffect, useState, useContext } from 'react';
import PropTypes from 'prop-types';
import { useNavigate } from 'react-router-dom';
import { requestGet, requestPost } from '../../services/utils';
import { AppContext } from '../../services/AppProvider';

export default function AddressComponent({ totalCart, cart }) {
  const [sellers, setSellers] = useState([]);
  const [isDisabled, setIsDisabled] = useState(true);
  const [address, setAddress] = useState({ address: '', number: '' });
  const { clearCart } = useContext(AppContext);
  const navigate = useNavigate();

  useEffect(() => {
    async function fetchData() {
      const list = await requestGet('users/sellers');
      setSellers(list);
    }
    fetchData();
    console.log('botão tá desabilitado? -', isDisabled);
  }, [isDisabled]);

  useEffect(() => {
    if (!totalCart) return setIsDisabled(true);
    if (!address.address || address.address === '') return setIsDisabled(true);
    if (!address.number || address.number === '') return setIsDisabled(true);
    setIsDisabled(false);
  }, [totalCart, address]);

  const handleAddressChange = ({ target }) => {
    setAddress((state) => ({ ...state, [target.id]: target.value }));
  };

  const sendOrder = async (order) => {
    const { id } = await requestPost('customer/orders', order);
    // TODO - tratar resposta em caso de erro
    console.log('requisição tá on? -', id);
    clearCart();
    navigate(`/customer/orders/${id}`);
  };

  const handleSendOrder = () => {
    const sellerId = document.getElementById('sellersList').value;
    const products = cart.map((item) => ({
      productId: item.id,
      quantity: item.qtde,
    }));

    const order = {
      sellerId,
      deliveryAddress: address.address,
      deliveryNumber: address.number,
      products,
    };

    setIsDisabled(true);

    console.log('order? -', order);
    sendOrder(order);
  };

  return (
    <div className="borderStyle">
      <div className="deliveryDetails">
        <div>
          <label htmlFor="sellersList">
            P. Vendedora Responsável:
            <select
              id="sellersList"
              data-testid="customer_checkout__select-seller"
            >
              { sellers.map((seller) => (
                <option
                  key={ seller.id }
                  value={ seller.id }
                >
                  { seller.name }
                </option>
              )) }
            </select>
          </label>
        </div>
        <div>
          <label htmlFor="address">
            Endereço:
            <input
              type="text"
              id="address"
              data-testid="customer_checkout__input-address"
              onChange={ handleAddressChange }
              value={ address.address }
            />
          </label>
        </div>
        <div>
          <label htmlFor="number">
            Número:
            <input
              type="text"
              id="number"
              data-testid="customer_checkout__input-address-number"
              onChange={ handleAddressChange }
              value={ address.number }
            />
          </label>
        </div>
      </div>

      <div className="nextBtn">
        <button
          type="button"
          className="cartBtn"
          disabled={ isDisabled }
          data-testid="customer_checkout__button-submit-order"
          onClick={ handleSendOrder }
        >
          FINALIZAR PEDIDO
        </button>
      </div>
    </div>
  );
}
AddressComponent.propTypes = {
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  })).isRequired,
  totalCart: PropTypes.number.isRequired,
};
