import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import addProductToCart from '../../helpers/addProductToCart';

export default class ProductCard extends Component {
  handleClick = () => {
    console.log(this.props);
    const { title, thumbnail, price, id, increaseQty,
      available_quantity: availableQuantity } = this.props;
    const infos = {
      title,
      thumbnail,
      price,
      id,
      availableQuantity,
      amount: 0,
    };
    addProductToCart(infos);
    increaseQty();
  }

  render() {
    const { title, thumbnail, price, id,
      shipping: { free_shipping: freeShipping } } = this.props;
    return (
      <div id="container" data-testid="product">
        <Link to={ `/product-details/${id}` } id={ id }>
          <div data-testid="product-detail-link" id={ id }>
            <h3>{ title }</h3>
            <img src={ thumbnail } alt="" />
            { freeShipping && <p data-testid="free-shipping"> Frete grátis </p> }
            <p>{`R$: ${price} `}</p>
          </div>
        </Link>
        <button
          type="button"
          data-testid="product-add-to-cart"
          onClick={ this.handleClick }
        >
          Add to Cart
        </button>
      </div>
    );
  }
}

ProductCard.propTypes = {
  title: PropTypes.string,
  thumbnail: PropTypes.string,
  price: PropTypes.number,
  id: PropTypes.string,
}.isRequired;
