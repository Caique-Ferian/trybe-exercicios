import React from 'react';
import { screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import renderWithRouter from './helpers/renderWIthRouter';
import App from '../App';

describe('Testando component PokemonDetails', () => {
  beforeEach(() => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/4');
  });
  test(`Testando se exibe corretamente um "h2" com "<name> Details" 
  onde <name> deve ser o nome do pokemon.`, () => {
    const pokemonDetailsTitle = screen.getByRole('heading',
      { name: /charmander details/i, level: 2 });
    expect(pokemonDetailsTitle).toBeInTheDocument();
  });
  test('Testando se não existe um Link de navegação.', () => {
    const pokemonDetails = screen.queryByRole('link', { name: /More details/i });
    expect(pokemonDetails).toBe(null);
  });
  test(`Testando se exibe corretamente um "h2" com "Summary" 
  e se existe um paragrafo com um resumo do pokemon.`, () => {
    const pokemonDetailsSummary = screen.getByRole('heading',
      { name: /summary/i, level: 2 });
    expect(pokemonDetailsSummary).toBeInTheDocument();
    const pokemonDetailsResume = screen.getByText(/The flame on its tail shows/i);
    expect(pokemonDetailsResume).toBeInTheDocument();
  });
  test(`Testando se exibe corretamente um "h2" com "Game Locations of <name>" onde <name> 
  deve ser o nome do pokemon e se são exibidas as localizações corretas`, () => {
    const pokemonDetailsTitle = screen.getByRole('heading',
      { name: /Game Locations of charmander/i, level: 2 });
    expect(pokemonDetailsTitle).toBeInTheDocument();
    const locationOne = screen.getByText('Alola Route 3');
    const locationsImgs = screen.getAllByAltText(/charmander location/i);
    const four = 4;
    expect(locationOne).toBeInTheDocument();
    expect(locationsImgs).toHaveLength(four);
    expect(locationsImgs[0].src).toBe('https://cdn2.bulbagarden.net/upload/9/93/Alola_Route_3_Map.png');
    const locationTwo = screen.getByText('Kanto Route 3');
    expect(locationTwo).toBeInTheDocument();
    expect(locationsImgs[1].src).toBe('https://cdn2.bulbagarden.net/upload/4/4a/Kanto_Route_3_Map.png');
    const locationThree = screen.getByText('Kanto Route 4');
    expect(locationThree).toBeInTheDocument();
    expect(locationsImgs[2].src).toBe('https://cdn2.bulbagarden.net/upload/2/24/Kanto_Route_4_Map.png');
    const locationFour = screen.getByText('Kanto Rock Tunnel');
    expect(locationFour).toBeInTheDocument();
    expect(locationsImgs[3].src).toBe('https://cdn2.bulbagarden.net/upload/6/6f/Kanto_Rock_Tunnel_Map.png');
  });
});
describe('Favoritando Pokemon', () => {
  test('Testando se é possivel favoritar o pokemon ao clicar na Checkbox.', () => {
    const { history } = renderWithRouter(<App />);
    history.push('pokemons/4');
    const favoritingPokemon = screen.getByLabelText(/Pokémon favoritado/i);
    expect(favoritingPokemon).toBeInTheDocument();
    userEvent.click(favoritingPokemon);
    history.push('/favorites');
    const pokemonName = screen.getByTestId('pokemon-name');
    expect(pokemonName).toBeInTheDocument();
    expect(pokemonName).toHaveTextContent(/charmander/i);
  });
});
