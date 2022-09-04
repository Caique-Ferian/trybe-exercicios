/* eslint-disable react/jsx-max-depth */
import React, { useEffect, useState } from 'react';
import { useHistory } from 'react-router-dom';
import './login.css';
// import { BsPersonFill } from 'react-icons/bs';
// import { FaLock } from 'react-icons/fa';
import img from '../../images/cooking.png';

export default function Login() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isDisabled, setDisabled] = useState(true);
  const history = useHistory();

  const emailValidate = (e) => {
    const regex = /^[a-z0-9_]+@[a-z0-9]+\.[a-z]+(\.[a-z]+)?$/i;
    return regex.test(e);
  };

  useEffect(() => {
    const handleValidate = () => {
      const six = 6;
      if (emailValidate(email) && password.length > six) {
        setDisabled(false);
      } else {
        setDisabled(true);
      }
    };

    handleValidate();
  }, [email, password]);

  const handleButton = () => {
    localStorage.setItem('mealsToken', 1);
    localStorage.setItem('cocktailsToken', 1);
    localStorage.setItem('user', JSON.stringify({ email }));
    history.push('/foods');
  };

  return (

    <div className="container">
      <form className="login-form login">
        <h1>Login</h1>
        <div className="input-field">
          {/* <span><BsPersonFill /></span> */}
          <input
            type="email"
            name="email"
            data-testid="email-input"
            placeholder="Email"
            value={ email }
            onChange={ (e) => {
              setEmail(e.target.value);
            } }
          />

        </div>
        <div className="input-field">
          {/* <span><FaLock /></span> */}
          <input
            type="text"
            name="password"
            data-testid="password-input"
            placeholder="password"
            value={ password }
            onChange={ (e) => {
              setPassword(e.target.value);
            } }
          />

        </div>
        <button
          className="btn btn-center"
          type="submit"
          disabled={ isDisabled }
          data-testid="login-submit-btn"
          onClick={ handleButton }
        >
          Entrar
        </button>

      </form>
      <img src={ img } className="image" alt="" />
    </div>
    // </div>
  );
}
