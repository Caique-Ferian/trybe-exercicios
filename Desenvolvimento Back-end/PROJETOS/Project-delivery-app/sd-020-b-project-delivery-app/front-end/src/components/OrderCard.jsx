import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import './OrderCard.css';

export default function OrderCard({ rote, product, dataTest, address }) {
  const { id, totalPrice, deliveryAddress, saleDate, status } = product;

  const data = new Date(saleDate);

  const options = { day: 'numeric', month: 'numeric', year: 'numeric' };

  const ptDate = data.toLocaleString('pt-BR', options);

  return (
    <Link to={ `/${rote}/orders/${id}` } className="order">
      <div className="orderId" data-testid={ `${dataTest}__element-order-id-${id}` }>
        <h4>
          Pedido
        </h4>
        <h3>
          { id }
        </h3>
      </div>
      <div className="infosOrder">
        <div className="statusDate">
          <h2
            className="status"
            data-testid={ `${dataTest}__element-delivery-status-${id}` }
          >
            { status }
          </h2>
          <div className="datePrice">
            <span data-testid={ `${dataTest}__element-order-date-${id}` }>
              { ptDate }
            </span>
            <br />
            <span data-testid={ `${dataTest}__element-card-price-${id}` }>
              { totalPrice.replace('.', ',') }
            </span>
          </div>
        </div>
        { address && (
          <div className="card-footer">
            <div>

              <p
                data-testid={ `seller_orders__element-card-address-${id}` }
              >
                <span> Endereço: </span>
                { deliveryAddress }
              </p>
            </div>
          </div>
        )}
      </div>
    </Link>
  );
}

OrderCard.propTypes = {
  rote: PropTypes.string.isRequired,
  dataTest: PropTypes.string.isRequired,
  address: PropTypes.bool.isRequired,
  product: PropTypes.shape({
    id: PropTypes.number,
    totalPrice: PropTypes.string,
    deliveryAddress: PropTypes.string,
    saleDate: PropTypes.string,
    status: PropTypes.string,
  }).isRequired,
};
