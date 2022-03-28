import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWIthRouter';
import Pokemon from '../components/Pokemon';

const pokemonList = require('./mocks/FavoriteMocks');

describe('Testando component Pokemon', () => {
  test('Testando se exibe corretamente o pokemon na tela.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite={ false } />);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/charmander/i);
    const pokemonType = screen.getByTestId('pokemon-type');
    expect(pokemonType).toBeInTheDocument();
    expect(pokemonType).toHaveTextContent(/fire/i);
    const pokemonWeight = screen.getByTestId('pokemon-weight');
    expect(pokemonWeight).toBeInTheDocument();
    expect(pokemonWeight).toHaveTextContent('Average weight: 8.5 kg');
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/0/0a/Spr_5b_004.png';
    const pokemonImg = screen.getByAltText(/charmander sprite/i);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe(imgSrc);
  });
  test(`Testando se existe um link e se ao clicar nele é 
  redirecionado para página correta.`, () => {
    const { history } = renderWithRouter(<Pokemon
      pokemon={ pokemonList[0] }
      isFavorite={ false }
    />);
    const pokemonDetails = screen.getByRole('link', { name: /More details/i });
    expect(pokemonDetails).toBeInTheDocument();
    userEvent.click(pokemonDetails);
    const { location: { pathname } } = history;
    expect(pathname).toBe('/pokemons/4');
  });
  test('Testando se exibe uma estrela ao favoritar pokemon.', () => {
    renderWithRouter(<Pokemon pokemon={ pokemonList[0] } isFavorite />);
    const pokemonImg = screen.getByAltText(/charmander is marked as favorite/i);
    expect(pokemonImg).toBeInTheDocument();
    expect(pokemonImg.src).toBe('http://localhost/star-icon.svg');
  });
});
