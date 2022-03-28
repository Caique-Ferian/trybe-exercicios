import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWIthRouter';
import FavoritePokemons from '../components/FavoritePokemons';

const favoriteList = require('./mocks/FavoriteMocks');

describe('Testando component FavoritePokemons', () => {
  test('Testando se existe uma mensagem "No favorite pokemon found".', () => {
    renderWithRouter(<FavoritePokemons />);
    const notFoundMessage = screen.getByText(/No favorite pokemon found/i);
    expect(notFoundMessage).toBeInTheDocument();
  });
  test('Testando se exibe todos pokemons favoritos.', () => {
    renderWithRouter(<FavoritePokemons pokemons={ favoriteList } />);
    const pokemons = screen.getAllByTestId('pokemon-name');
    expect(pokemons).toHaveLength(2);
    expect(pokemons[0]).toHaveTextContent(/charmander/i);
    expect(pokemons[1]).toHaveTextContent(/snorlax/i);
  });
});
