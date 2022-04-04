import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import Header from '../components/Header';
import SpendForms from '../components/SpendForms';
import SpendEditForms from '../components/SpendEditForms';
import WalletTable from '../components/WalletTable';

function Wallet(props) {
  const { spendToEdit } = props;
  let validation;
  if (spendToEdit) {
    validation = Object.keys(spendToEdit).length;
  }
  return (
    <div>
      <Header />
      {validation ? <SpendEditForms /> : <SpendForms />}
      <WalletTable />
    </div>);
}
const mapStateToProps = (state) => ({
  spendToEdit: state.wallet.spendToEdit,
});
Wallet.propTypes = {
  spendToEdit: PropTypes.object,
}.isRequired;
export default connect(mapStateToProps)(Wallet);
