import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from '../renderWithRouter';
import ExploreFoods from '../Pages/ExploreFoods';

describe('Testa os elementos da tela de explorar comidas', () => {
  test('Testa os data-testids dos botões e se estão na tela', () => {
    renderWithRouter(<ExploreFoods />);
    const exploreByIngredient = screen.getByTestId('explore-by-ingredient');
    const exploreByNationality = screen.getByTestId('explore-by-nationality');
    const exploreSurprise = screen.getByTestId('explore-surprise');
    expect(exploreByIngredient).toBeInTheDocument();
    expect(exploreByNationality).toBeInTheDocument();
    expect(exploreSurprise).toBeInTheDocument();
  });
  test('Testa se redireciona a pessoa usuária para "By Ingredient"', () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const linkByIngredient = screen.getByRole('link', { name: /By Ingredient/i });
    userEvent.click(linkByIngredient);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/ingredients');
  });
  test('Testa se redireciona a pessoa usuária para "By Nationality"', () => {
    const { history } = renderWithRouter(<ExploreFoods />);
    const linkByNationality = screen.getByRole('link', { name: /By Nationality/i });
    userEvent.click(linkByNationality);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/explore/foods/nationalities');
  });
});
