import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import Explore from '../Pages/Explore';

describe('Testa os elementos da tela de explorar', () => {
  test('Testa se tem os data-testids explore-foods e explore-drinks.', () => {
    renderWithRouter(<Explore />);
    const exploreFoods = screen.getByTestId('explore-foods');
    const exploreDrinks = screen.getByTestId('explore-drinks');
    expect(exploreFoods).toBeInTheDocument();
    expect(exploreDrinks).toBeInTheDocument();
  });
  test('Testa se o nomes dos botões são "Explore Foods" e "Explore Drinks', () => {
    renderWithRouter(<Explore />);
    const btnExploreFoods = screen.getByRole('button', { name: /Explore Foods/i });
    const btnExploreDrinks = screen.getByRole('button', { name: /Explore Drinks/i });
    expect(btnExploreFoods).toBeInTheDocument();
    expect(btnExploreDrinks).toBeInTheDocument();
  });
  test('Testa se redireciona a pessoa usuária para "Explore Foods"', () => {
    const { history } = renderWithRouter(<Explore />);
    const linkExploreFoods = screen.getByRole('link', { name: /Explore Foods/i });
    userEvent.click(linkExploreFoods);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods');
  });
  test('Testa se redireciona a pessoa usuária para "Explore Foods"', () => {
    const { history } = renderWithRouter(<Explore />);
    const linkExploreDrinks = screen.getByRole('link', { name: /Explore Drinks/i });
    userEvent.click(linkExploreDrinks);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks');
  });
});
