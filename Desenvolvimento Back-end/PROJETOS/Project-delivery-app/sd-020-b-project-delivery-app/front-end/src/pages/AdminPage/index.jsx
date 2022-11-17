import React, { useState } from 'react';
import NavBar from '../../components/NavBar';
import Table from '../../components/Table';
import { validate, MINPASSWORDLENGTH,
  MIN_NAME_LENGTH, regexEmail, requestPost } from '../../services/utils';

export default function PageAdmin() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [name, setName] = useState('');
  const [role, setRole] = useState('');
  const [createdWithSuccess, setCreatedWithSuccess] = useState(true);

  const register = async (e) => {
    e.preventDefault();
    try {
      setCreatedWithSuccess(true);
      await requestPost(
        'register',
        { name, email, password, role },
      );
    } catch (error) {
      setCreatedWithSuccess(false);
    }
  };
  return (
    <div>
      <NavBar />
      <form>
        <label htmlFor="name-input">
          Nome
          <input
            data-testid="admin_manage__input-name"
            type="text"
            value={ name }
            onChange={ ({ target: { value } }) => setName(value) }
            placeholder="Nome e sobrenome"
          />
        </label>
        { name.length < MIN_NAME_LENGTH && (
          <p> Nome deve possuir no mínimo 12 caracteres</p>) }
        <label htmlFor="email-input">
          Email
          <input
            data-testid="admin_manage__input-email"
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
            data-testid="admin_manage__input-password"
            type="password"
            value={ password }
            onChange={ ({ target: { value } }) => setPassword(value) }
            placeholder="******"
          />
          { password.length < MINPASSWORDLENGTH && (
            <p> Senha deve possuir no mínimo 6 caracteres</p>) }
        </label>
        <label htmlFor="role-input">
          Cargo
          <select
            data-testid="admin_manage__select-role"
            value={ role }
            onChange={ ({ target: { value } }) => setRole(value) }
          >
            <option value="" disabled hidden>Selecione um cargo</option>
            <option value="seller">Vendedor</option>
            <option value="customer">Cliente</option>
          </select>
        </label>
        <button
          data-testid="admin_manage__button-register"
          type="button"
          disabled={ !validate(email, password, name, role) }
          onClick={ (e) => register(e) }
        >
          CADASTRAR
        </button>
        <p
          style={ { display: !createdWithSuccess ? 'block' : 'none' } }
          data-testid="admin_manage__element-invalid-register"
        >
          Nome ou email já existentes no banco de dados
        </p>
      </form>
      <h2>Lista de usuários</h2>
      <Table />
    </div>
  );
}
