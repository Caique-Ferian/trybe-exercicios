import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWIthRouter';
import App from '../App';
import Pokedex from '../components/Pokedex';

const pokemonList = require('./mocks/FavoriteMocks');
const favoriteState = require('./mocks/IsFavoriteIdState');

describe('Testando component Pokédex', () => {
  test('Testando se existe uma tag "h2" no componente.', () => {
    renderWithRouter(<App />);
    const pokedexTitle = screen.getByRole('heading',
      { name: /Encountered pokémons/i, level: 2 });
    expect(pokedexTitle).toBeInTheDocument();
  });
  test('Testando se existe um botão "Próximo Pokemon" no componente.', () => {
    renderWithRouter(<App />);
    const changePokemonButton = screen.getByTestId('next-pokemon');
    expect(changePokemonButton).toBeInTheDocument();
  });
  test('Testando se ao clicar no botão "Próximo Pokemon" o pokemon é alterado.', () => {
    renderWithRouter(<Pokedex
      pokemons={ pokemonList }
      isPokemonFavoriteById={ favoriteState }
    />);
    const changePokemonButton = screen.getByTestId('next-pokemon');
    userEvent.click(changePokemonButton);
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/snorlax/i);
    userEvent.click(changePokemonButton);
    expect(pokemonName).toHaveTextContent(/charmander/i);
  });
  test('Testando se é exibido um pokemon por vez.', () => {
    renderWithRouter(<App />);
    const pokemon = screen.getAllByTestId('pokemon-name');
    expect(pokemon).toHaveLength(1);
  });
  it('Testando se a página contém um button para cada tipo de pokemon.', () => {
    renderWithRouter(<App />);
    const eletric = screen.getByRole('button', { name: /Electric/i });
    expect(eletric).toBeDefined();
    const fire = screen.getByRole('button', { name: /Fire/i });
    expect(fire).toBeDefined();
    const bug = screen.getByRole('button', { name: /Bug/i });
    expect(bug).toBeDefined();
    const poison = screen.getByRole('button', { name: /Poison/i });
    expect(poison).toBeDefined();
    const psychic = screen.getByRole('button', { name: /Psychic/i });
    expect(psychic).toBeDefined();
    const normal = screen.getByRole('button', { name: /Normal/i });
    expect(normal).toBeDefined();
    const dragon = screen.getByRole('button', { name: /Dragon/i });
    expect(dragon).toBeDefined();
  });
  test('Testando os botões de filtro da Pokédex.', () => {
    renderWithRouter(<App />);
    const allButtons = screen.getAllByTestId('pokemon-type-button');
    const seven = 7;
    expect(allButtons).toHaveLength(seven);
    userEvent.click(allButtons[1]);
    const charmander = screen.getByText(/charmander/i);
    expect(charmander).toBeInTheDocument();
    const allFilter = screen.getByText(/all/i);
    expect(allFilter).toBeInTheDocument();
    userEvent.click(allFilter);
    const pikachu = screen.getByText(/pikachu/i);
    expect(pikachu).toBeInTheDocument();
    expect(allFilter).not.toBeDisabled();
  });
});
