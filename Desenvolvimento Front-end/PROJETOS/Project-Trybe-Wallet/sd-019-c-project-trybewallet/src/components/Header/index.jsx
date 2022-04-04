import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import './style.css';
import trybeLogo from '../../images/Trybe_logo-baixa.png';

function Header(props) {
  const { email, expenses } = props;
  const ZERO = 0;
  const totalSpendValue = expenses
    .reduce((acc, { value, currency, exchangeRates }) => acc
    + (parseInt(value, 10) * exchangeRates[currency].ask), 0);
  return (
    <div className="header-container">
      <img src={ trybeLogo } alt="Trybe-Logo" />
      <div className="user-container">
        <h5 data-testid="email-field">{email}</h5>
        <span className="spend-container">Despesa total: </span>
        <span
          data-testid="total-field"
        >
          {totalSpendValue ? totalSpendValue?.toFixed(2) : ZERO}

        </span>
        <span data-testid="header-currency-field">BRL</span>
      </div>
    </div>
  );
}
const mapStateToProps = (state) => ({
  email: state.user.email,
  expenses: state.wallet.expenses,
});
Header.propTypes = {
  email: PropTypes.string,
  expenses: PropTypes.arrayOf(PropTypes.object),
}.isRequired;

export default connect(mapStateToProps)(Header);
