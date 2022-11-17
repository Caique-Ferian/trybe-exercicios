import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { validate, MINPASSWORDLENGTH,
  MIN_NAME_LENGTH, regexEmail, requestPost, setToken } from '../../services/utils';

export default function Register() {
  const navigate = useNavigate();
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [createdWithSuccess, setCreatedWithSuccess] = useState(false);

  const register = async (e) => {
    e.preventDefault();
    try {
      const user = await requestPost(
        'register',
        { name, email, password, role: 'customer' },
      );
      localStorage.setItem('user', JSON.stringify(user));
      setToken(user.token);
      navigate('/customer/products');
    } catch (error) {
      setCreatedWithSuccess(true);
    }
  };
  return (
    <div>
      <form>
        <label htmlFor="name-input">
          Nome
          <input
            data-testid="common_register__input-name"
            type="text"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            placeholder="Seu nome"
          />
        </label>
        { name.length < MIN_NAME_LENGTH && (
          <p> Nome deve possuir no mínimo 12 caracteres</p>) }
        <label htmlFor="password-email">
          Email
          <input
            data-testid="common_register__input-email"
            type="text"
            value={ email }
            onChange={ ({ target: { value } }) => setEmail(value) }
            placeholder="seu-email@site.com.br"
          />

          { !regexEmail.test(email) && (
            <p>Informe um email válido</p>) }
        </label>
        <label htmlFor="password-input">
          Senha
          <input
            data-testid="common_register__input-password"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            placeholder="******"
          />
          { password.length < MINPASSWORDLENGTH && (
            <p> Senha deve possuir no mínimo 6 caracteres</p>) }
        </label>
        <button
          data-testid="common_register__button-register"
          type="button"
          disabled={ !validate(email, password, name) }
          onClick={ (e) => register(e) }
        >
          CADASTRAR
        </button>
        <p
          style={ { display: createdWithSuccess ? 'block' : 'none' } }
          data-testid="common_register__element-invalid_register"
        >
          Nome ou email já existentes no banco de dados
        </p>
      </form>
    </div>
  );
}
