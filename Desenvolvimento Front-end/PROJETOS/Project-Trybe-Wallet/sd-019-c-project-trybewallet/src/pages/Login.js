import React, { useState, useEffect } from 'react';
import LoginButton from '../components/LoginButton';
import 'bootstrap/dist/css/bootstrap.min.css';
import './login.css';
import wallet from '../images/dv6y2019130322019-04-014630664Digital-Wallet-Logo.jpg';

export default function Login() {
  const [email, setUserEmail] = useState('');
  const [userPassword, setUserPassword] = useState('');
  const [buttonDisabled, setButtonDisabled] = useState(true);
  const handleChange = ({ target }) => {
    const { name, value } = target;
    if (name === 'email') {
      setUserEmail(value);
    } else {
      setUserPassword(value);
    }
  };
  const validation = () => {
    const six = 6;
    const emailRegex = /\S+@\S+\.\S+/i;
    if (userPassword.length < six || !emailRegex.test(email)) {
      setButtonDisabled(true);
    } else {
      setButtonDisabled(false);
    }
  };
  useEffect(validation);
  return (
    <div className="login-container">
      <div className="img-container">
        <h4>Trybe Wallet</h4>
        <img src={ wallet } alt="wallet-img" />
      </div>
      <input
        data-testid="email-input"
        className="form-control"
        name="email"
        onChange={ handleChange }
        placeholder="Email"
        type="email"
        value={ email }
      />
      <input
        data-testid="password-input"
        className="form-control input-class"
        name="password"
        onChange={ handleChange }
        placeholder="Senha"
        type="password"
        value={ userPassword }
      />
      <LoginButton email={ email } buttonDisabled={ buttonDisabled } />
    </div>);
}
