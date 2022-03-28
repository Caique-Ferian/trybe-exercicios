import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWIthRouter';
import App from '../App';

describe('Testando component App', () => {
  test('Testando se os links de navegação são renderizados', () => {
    renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    expect(homeLink).toBeInTheDocument();
    const aboutLink = screen.getByRole('link', { name: /about/i });
    expect(aboutLink).toBeInTheDocument();
    const favoritePokemonsLink = screen.getByRole('link', { name: /favorite pokémons/i });
    expect(favoritePokemonsLink).toBeInTheDocument();
  });
  test('Testando se ao clicar no Link Home o seu pathname é "/"', () => {
    const { history } = renderWithRouter(<App />);
    const homeLink = screen.getByRole('link', { name: /home/i });
    userEvent.click(homeLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/');
  });
  test('Testando se ao clicar no Link About o seu pathname é "/about"', () => {
    const { history } = renderWithRouter(<App />);
    const aboutLink = screen.getByRole('link', { name: /about/i });
    userEvent.click(aboutLink);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/about');
  });
  test('Testando se ao clicar no Link Favorite Pokémons o seu pathname é "/favorite"',
    () => {
      const { history } = renderWithRouter(<App />);
      const favoritePokemonsLink = screen
        .getByRole('link', { name: /favorite pokémons/i });
      userEvent.click(favoritePokemonsLink);
      const { location: { pathname } } = history;
      expect(pathname).toBe('/favorites');
    });
  test('Testando se ao fornecer uma URL desconhecida o componente NotFound é renderizado',
    () => {
      const { history } = renderWithRouter(<App />);
      history.push('/teste');
      const notFoundComponent = screen.getByRole('heading',
        { name: /Page requested not found/i, level: 2 });
      expect(notFoundComponent).toBeInTheDocument();
    });
});
