import React from 'react';
import PropTypes from 'prop-types';

class Login extends React.Component {
  render() {
    const { name, handleChange, isSubmitButtonDisabled,
      onButtonClick } = this.props;
    return (
      <div data-testid="page-login">
        <form onSubmit={ (e) => e.preventDefault() }>
          <input
            data-testid="login-name-input"
            name="name"
            onChange={ handleChange }
            type="text"
            value={ name }
          />
          <button
            data-testid="login-submit-button"
            disabled={ isSubmitButtonDisabled }
            onClick={ () => onButtonClick() }
            type="submit"
          >
            Entrar
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  name: PropTypes.string,
  handleChange: PropTypes.func,
  isSubmitButtonDisabled: PropTypes.bool,
}.isRequired;

export default Login;
