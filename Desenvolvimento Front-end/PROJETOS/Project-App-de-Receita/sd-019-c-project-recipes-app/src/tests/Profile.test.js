import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Profile from '../Pages/Profile';
import Login from '../Pages/Login';

describe('Testa os elementos da tela de perfil', () => {
  test('Testa o data-testid do email e de todos os botões e se estão na tela', () => {
    renderWithRouter(<Login />);
    const emailInput = screen.getByTestId('email-input');
    userEvent.type(emailInput, 'alguem@alguem.com');
    const passwordInput = screen.getByTestId('password-input');
    userEvent.type(passwordInput, 'Mari9523');
    const loginSubmitBtn = screen.getByTestId('login-submit-btn');
    userEvent.click(loginSubmitBtn);

    renderWithRouter(<Profile />);
    const profileEmail = screen.getByTestId('profile-email');
    const profileDoneBtn = screen.getByTestId('profile-done-btn');
    const profileFavoriteBtn = screen.getByTestId('profile-favorite-btn');
    const profileLogoutBtn = screen.getByTestId('profile-logout-btn');
    expect(profileEmail).toBeInTheDocument();
    expect(profileDoneBtn).toBeInTheDocument();
    expect(profileFavoriteBtn).toBeInTheDocument();
    expect(profileLogoutBtn).toBeInTheDocument();
  });
  test('Testa se redireciona a pessoa usuária para "Favorite Recipes"', () => {
    const { history } = renderWithRouter(<Profile />);
    const linkFavoriteRecipes = screen.getByRole('link', { name: /Favorite Recipes/i });
    userEvent.click(linkFavoriteRecipes);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/favorite-recipes');
  });
  test('Testa se redireciona a pessoa usuária para "Done Recipes"', () => {
    const { history } = renderWithRouter(<Profile />);
    const linkDoneRecipes = screen.getByRole('link', { name: /Done Recipes/i });
    userEvent.click(linkDoneRecipes);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/done-recipes');
  });
  test('Testa se redireciona a pessoa usuária para "Logout"', () => {
    const { history } = renderWithRouter(<Profile />);
    const linkLogout = screen.getByRole('button', { name: /Logout/i });
    userEvent.click(linkLogout);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
    expect(!localStorage.length).toBe(true);
  });
});
