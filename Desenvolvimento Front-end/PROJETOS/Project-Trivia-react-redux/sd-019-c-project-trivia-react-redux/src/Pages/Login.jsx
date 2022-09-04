import React, { PureComponent } from 'react';
import PropTypes from 'prop-types';
import { connect } from 'react-redux';
import logo from '../trivia.png';
import '../styles/Login.scss';
import { getTokenThunk } from '../reducers/token';
import { fetchApiQuestions } from '../reducers/game';
import { getName, getEmail, addScoreAction } from '../actions';

class Login extends PureComponent {
  constructor() {
    super();

    this.state = {
      disabled: true,
      email: '',
      userName: '',
    };
  }

  handleInput = ({ target: { name, value } }) => {
    this.setState({ [name]: value }, () => this.validateInput());
  };

  validateInput = () => {
    const { email, userName } = this.state;
    const regex = /^[\w-.]+@([\w-]+\.)+[\w-]{2,4}$/g;
    const MIN_LENGTH = 3;
    if (regex.test(email) && userName.length >= MIN_LENGTH) {
      return this.setState({ disabled: false });
    }
    this.setState({ disabled: true });
  }

  handleLogin = async (e) => {
    const { props: { history, saveToken, nameDispatch,
      emailDispatch, dispatchGameRequest, dispatchScore },
    state: { userName, email } } = this;
    e.preventDefault();
    await saveToken();
    const { token } = this.props;
    nameDispatch(userName);
    emailDispatch(email);
    await dispatchGameRequest(token);
    dispatchScore(0);
    history.push('/game');
  }

  settingButton = () => {
    const { history } = this.props;
    history.push('/settings');
  }

  render() {
    const {
      state: { email, userName, disabled },
      handleInput,
      handleLogin,
      settingButton } = this;
    return (
      <div className="App">
        <header className="App-header">
          <img src={ logo } className="App-logo" alt="logo" />
        </header>
        <form className="form-container">
          <label htmlFor="userName">
            <input
              placeholder="Nome de Usuário"
              type="text"
              name="userName"
              id="userName"
              value={ userName }
              data-testid="input-player-name"
              onChange={ handleInput }
            />
          </label>
          <label htmlFor="email">
            <input
              placeholder="Email"
              onChange={ handleInput }
              type="email"
              name="email"
              id="email"
              value={ email }
              data-testid="input-gravatar-email"
            />
          </label>
          <button
            type="submit"
            data-testid="btn-play"
            disabled={ disabled }
            onClick={ handleLogin }
          >
            Play
          </button>
          <button
            type="button"
            data-testid="btn-settings"
            onClick={ settingButton }
          >
            Settings
          </button>
        </form>
      </div>
    );
  }
}

Login.propTypes = {
  emailDispatch: PropTypes.func,
  nameDispatch: PropTypes.func,
  saveToken: PropTypes.func,
  history: PropTypes.shape({
    push: PropTypes.func,
  }),
}.isRequired;
const mapStateToProps = (state) => ({
  token: state.token,
});
const mapDispatchToProps = (dispatch) => ({
  saveToken: () => dispatch(getTokenThunk()),
  nameDispatch: (user) => dispatch(getName(user)),
  emailDispatch: (email) => dispatch(getEmail(email)),
  dispatchGameRequest: (token) => dispatch(fetchApiQuestions(token)),
  dispatchScore: (score) => dispatch(addScoreAction(score)),
});
export default connect(mapStateToProps, mapDispatchToProps)(Login);
