import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './renderWithRouter';
import App from '../App';

describe('Verifica se os inputs estão funcionando', () => {
  beforeEach(() => {
    renderWithRouter(<App />);
  });

  it('testa o input de userName', () => {
    const userNameInput = screen.getByTestId('input-player-name');
    expect(userNameInput).toBeInTheDocument();
  });

  it('testa o input de email', () => {
    const emailInput = screen.getByTestId('input-gravatar-email');
    expect(emailInput).toBeInTheDocument();
  });

  it('testa se o botão Play está desabilitado sem input de informações', () => {
    const button = screen.getByTestId('btn-play');
    expect(button).toBeDisabled();
  });
});
