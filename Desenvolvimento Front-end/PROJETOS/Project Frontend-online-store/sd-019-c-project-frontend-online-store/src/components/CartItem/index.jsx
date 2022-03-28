import React, { Component } from 'react';
import PropTypes from 'prop-types';
// import increaseItemOnCart from '../../helpers/ItensCart';

export default class CartItem extends Component {
  render() {
    const { title, thumbnail, price, amount, id, handleClick } = this.props;
    return (
      <div id={ id }>
        <h3 data-testid="shopping-cart-product-name">{ title }</h3>
        <img src={ thumbnail } alt="" />
        <p>{`R$: ${price} `}</p>
        <p data-testid="shopping-cart-product-quantity">
          {`Itens no Carrinho: ${amount}`}
        </p>
        <button
          type="button"
          data-testid="product-increase-quantity"
          name="+"
          onClick={ handleClick }
        >
          +

        </button>
        <button type="button">Remover</button>
        <button
          type="button"
          data-testid="product-decrease-quantity"
          name="-"
          onClick={ handleClick }
        >
          {' '}
          -
          {' '}

        </button>
      </div>
    );
  }
}

CartItem.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  amount: PropTypes.number,
}.isRequired;
