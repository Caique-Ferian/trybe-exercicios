import React, { useState, useEffect, useContext } from 'react';
import { useNavigate } from 'react-router-dom';
import { requestPost, validate } from '../../services/utils';
import { AuthContext } from '../../services/AuthProvider';
import './login.css';
import logo from '../../images/logo.jpeg';

export default function Login() {
  const { tryLogin } = useContext(AuthContext);

  const navigate = useNavigate();

  // --- estados
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  // const [loggedIn, setLoggedIn] = useState(false);
  const [admLoggedIn, setAdmLoggedIn] = useState(false);
  const [sellerLoggedIn, setSellerLoggedIn] = useState(false);
  const [failedTryLogin, setFailedTryLogin] = useState(false);
  // --- estados

  const login = async (event) => {
    event.preventDefault();
    try {
      const user = await requestPost('/login', { email, password });
      localStorage.setItem('user', JSON.stringify(user));
      tryLogin();
      if (email === 'adm@deliveryapp.com') setAdmLoggedIn(true);
      if (email === 'fulana@deliveryapp.com') setSellerLoggedIn(true);
      // else setLoggedIn(true);
    } catch (error) {
      setFailedTryLogin(true);
    }
  };

  const userLogged = JSON.parse(localStorage.getItem('user'));
  console.log('user existe ----', userLogged);

  useEffect(() => {
    if (admLoggedIn) navigate('/admin/manage');
    if (sellerLoggedIn) navigate('/seller/orders');
    if (userLogged && userLogged.role === 'customer') navigate('/customer/products');
    // localStorage.removeItem('user');
    // localStorage.removeItem('cart');
  }, [admLoggedIn, sellerLoggedIn, userLogged, navigate]);

  return (
    <div className="loginPage">
      <img src={ logo } alt="Logo" className="logo" />
      <form className="loginform">
        <label htmlFor="email-input">
          <input
            data-testid="common_login__input-email"
            className="login__login_input"
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            placeholder="Login"
          />
        </label>
        <label htmlFor="password-input">
          <input
            data-testid="common_login__input-password"
            className="login__login_input"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            placeholder="Senha"
          />
        </label>
        {
          (failedTryLogin) && (
            <p data-testid="common_login__element-invalid-email">
              Usuário ou senha incorretos
            </p>)
        }
        <button
          className="loginbutton"
          data-testid="common_login__button-login"
          type="submit"
          disabled={ !validate(email, password) }
          onClick={ (event) => login(event) }
        >
          Entrar
        </button>
        <button
          className="loginbutton"
          data-testid="common_login__button-register"
          type="button"
          onClick={ () => navigate('/register') }
        >
          Ainda não tenho conta
        </button>
      </form>
    </div>
  );
}
