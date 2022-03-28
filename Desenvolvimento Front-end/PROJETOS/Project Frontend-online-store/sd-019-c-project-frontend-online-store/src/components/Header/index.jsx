import React, { Component } from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

export default class Header extends Component {
  render() {
    const { qty } = this.props;
    return (
      <div>
        <Link to="/cart" data-testid="shopping-cart-button">
          cart
          <h1 data-testid="shopping-cart-size">
            {qty}
          </h1>
        </Link>
      </div>
    );
  }
}

Header.propTypes = {
  qty: PropTypes.number,
}.isRequired;
