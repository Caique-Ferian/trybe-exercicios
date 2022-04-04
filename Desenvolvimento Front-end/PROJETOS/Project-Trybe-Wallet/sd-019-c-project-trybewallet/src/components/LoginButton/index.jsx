import React from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { dispatchEmailAction } from '../../actions';
import './style.css';

function LoginButton(props) {
  const handleClick = () => {
    const { dispatchEmail, email } = props;
    dispatchEmail(email);
  };
  const { buttonDisabled } = props;
  return (
    <Link to="/carteira">
      <button
        className="button"
        type="button"
        disabled={ buttonDisabled }
        onClick={ handleClick }
      >
        Entrar
      </button>
    </Link>);
}
const mapDispatchToProps = (dispatch) => ({
  dispatchEmail: (email) => dispatch(dispatchEmailAction(email)),
});

LoginButton.propTypes = {
  dispatchEmail: PropTypes.func,
  buttonDisabled: PropTypes.bool,
  email: PropTypes.string,
}.isRequired;

export default connect(null, mapDispatchToProps)(LoginButton);
