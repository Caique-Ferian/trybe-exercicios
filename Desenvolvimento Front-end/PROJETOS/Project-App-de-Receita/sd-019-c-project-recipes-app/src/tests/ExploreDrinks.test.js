import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ExploreDrinks from '../Pages/ExploreDrinks';

describe('Testa os elementos da tela de explorar comidas', () => {
  test('Testa os data-testids dos botões e se estão na tela', () => {
    renderWithRouter(<ExploreDrinks />);
    const exploreByIngredient = screen.getByTestId('explore-by-ingredient');
    const exploreSurprise = screen.getByTestId('explore-surprise');
    expect(exploreByIngredient).toBeInTheDocument();
    expect(exploreSurprise).toBeInTheDocument();
  });
  test('Testa se redireciona a pessoa usuária para "By Ingredient"', () => {
    const { history } = renderWithRouter(<ExploreDrinks />);
    const linkByIngredient = screen.getByRole('link', { name: /By Ingredient/i });
    userEvent.click(linkByIngredient);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/drinks/ingredients');
  });
});
