import React, { Component } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import { addSpendToEditAction, removeSpendAction } from '../../actions';
import './style.css';

class WalletTable extends Component {
  handleClickRemove = (id) => {
    const { dispatchRemoveSpend } = this.props;
    dispatchRemoveSpend(id);
  }

  handleClickEdit = (id) => {
    const { dispatchSpendToEdit } = this.props;
    dispatchSpendToEdit(id);
  }

  render() {
    const { expenses } = this.props;
    return (
      <div className="table-container">
        <table width="100%">
          <thead className="test">
            <tr>
              <th>Descrição</th>
              <th>Tag</th>
              <th>Método de pagamento</th>
              <th>Valor</th>
              <th>Moeda</th>
              <th>Câmbio utilizado</th>
              <th>Valor convertido</th>
              <th>Moeda de conversão</th>
              <th>Editar/Excluir</th>
            </tr>
          </thead>
          <tbody>
            {expenses?.map((spend) => (
              <tr key={ spend.id }>
                <td colSpan="1"><small>{spend.description}</small></td>
                <td colSpan="1"><small>{spend.tag}</small></td>
                <td colSpan="1"><small>{spend.method}</small></td>
                <td colSpan="1"><small>{parseFloat(spend.value).toFixed(2)}</small></td>
                <td colSpan="1">
                  <small>
                    {spend.exchangeRates[spend.currency].name.split('/')[0]}
                  </small>
                </td>
                <td colSpan="1">
                  <small>
                    {parseFloat(spend.exchangeRates[spend.currency].ask)
                      .toFixed(2)}
                  </small>
                </td>
                <td colSpan="1">
                  {
                    (spend.value * spend.exchangeRates[spend.currency].ask).toFixed(2)
                  }
                </td>
                <td colSpan="1"><small>Real</small></td>
                <td colSpan="1">
                  <button
                    data-testid="edit-btn"
                    className="button-edit"
                    onClick={ () => this.handleClickEdit(spend.id) }
                    type="button"
                  >
                    Editar
                  </button>
                  <button
                    data-testid="delete-btn"
                    className="button-delete"
                    onClick={ () => this.handleClickRemove(spend.id) }
                    type="button"
                  >
                    Excluir
                  </button>
                </td>
              </tr>))}
          </tbody>
        </table>
      </div>
    );
  }
}
const mapStateToProps = (state) => ({
  expenses: state.wallet.expenses,
});
const mapDispatchToProps = (dispatch) => ({
  dispatchRemoveSpend: (spendId) => dispatch(removeSpendAction(spendId)),
  dispatchSpendToEdit: (spendId) => dispatch(addSpendToEditAction(spendId)),
});
WalletTable.propTypes = {
  expenses: PropTypes.arrayOf(PropTypes.object),
  dispatchRemoveSpend: PropTypes.func,
  dispatchSpendToEdit: PropTypes.func,
}.isRequired;
export default connect(mapStateToProps, mapDispatchToProps)(WalletTable);
