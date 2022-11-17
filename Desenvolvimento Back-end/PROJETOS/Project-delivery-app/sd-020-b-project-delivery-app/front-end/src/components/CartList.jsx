import React from 'react';
import PropTypes from 'prop-types';
// import './CartList.css';

export default function CartList(props) {
  const { cart, updateCart, totalCart, dataTest, allowRemove = 'false' } = props;

  return (
    <div className="borderStyle alignRight">
      <table>
        <thead>
          <tr>
            <th>Item</th>
            <th>Descrição</th>
            <th>Quantidade</th>
            <th>Valor Unitário</th>
            <th>Sub-total</th>
            { allowRemove ? <th>Remover Item</th> : null }
          </tr>
        </thead>
        <tbody>
          { cart.map((item, index) => {
            let quantity = 1;
            if (allowRemove === 'false') {
              quantity = item.salesProducts.quantity;
            } else {
              quantity = item.qtde;
            }
            return (
              <tr key={ item.id }>
                <td
                // className="col1"
                  data-testid={

                    `${dataTest}__element-order-table-item-number-${index}`
                  }
                >
                  { index + 1 }
                </td>
                <td
                // className="tLeft col2"
                  data-testid={
                    `${dataTest}__element-order-table-name-${index}`
                  }
                >
                  { item.name }
                </td>
                <td
                // className="col3"
                  data-testid={
                    `${dataTest}__element-order-table-quantity-${index}`
                  }
                >
                  { quantity }
                </td>
                <td
                // className="col4"
                  data-testid={
                    `${dataTest}__element-order-table-unit-price-${index}`
                  }
                >
                  { item.price.replace('.', ',') }
                </td>
                <td
                // className="col5"
                  data-testid={
                    `${dataTest}__element-order-table-sub-total-${index}`
                  }
                >
                  { (quantity * parseFloat(item.price))
                    .toFixed(2).replace('.', ',') }
                </td>
                { allowRemove
                  ? (
                    <td className="col6">
                      <button
                        type="button"
                        data-testid={
                          `${dataTest}__element-order-table-remove-${index}`
                        }
                        onClick={ () => updateCart(item, 0) }
                      >
                        Remover
                      </button>
                    </td>
                  )
                  : null }
              </tr>
            );
          }) }
        </tbody>
      </table>

      <div className="infoDiv">
        <div className="totalInfo">
          <p
            data-testid={ `${dataTest}__element-order-total-price` }
          >
            {/* { `Total: R$ ${totalCart.toFixed(2)}` } */}
            { totalCart.toFixed(2).replace('.', ',') }
          </p>
        </div>
      </div>
    </div>
  );
}
CartList.propTypes = {
  allowRemove: PropTypes.string,
  cart: PropTypes.arrayOf(PropTypes.shape({
    id: PropTypes.number.isRequired,
    price: PropTypes.string.isRequired,
    name: PropTypes.string.isRequired,
    urlImage: PropTypes.string.isRequired,
  })).isRequired,
  updateCart: PropTypes.func,
  totalCart: PropTypes.number.isRequired,
  dataTest: PropTypes.string.isRequired,
};
CartList.defaultProps = {
  allowRemove: 'false',
  updateCart: null,
};
