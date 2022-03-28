import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWIthRouter';
import About from '../components/About';

describe('Testando component About', () => {
  beforeEach(() => renderWithRouter(<About />));
  test('Testando se existe uma tag "h2" no componente.', () => {
    const aboutTitle = screen.getByRole('heading',
      { name: /About Pokédex/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });
  test('Testando se existe duas tags "p" no componente.', () => {
    const paragraphOneText = 'This application simulates a Pokédex, '
      + 'a digital encyclopedia containing all Pokémons';
    const paragraphOne = screen.getByText(paragraphOneText);
    const paragraphTwoText = 'One can filter Pokémons by type, '
      + 'and see more details for each one of them';
    const paragraphTwo = screen.getByText(paragraphTwoText);
    expect(paragraphOne).toBeInTheDocument();
    expect(paragraphTwo).toBeInTheDocument();
  });
  test('Testando se existe uma tag "img" no componente com URL correta.', () => {
    const imgSrc = 'https://cdn2.bulbagarden.net/upload/thumb/8/86/Gen_I_Pok%C3%A9dex.png/800px-Gen_I_Pok%C3%A9dex.png';
    const aboutImg = screen.getByAltText(/Pokédex/i);
    expect(aboutImg).toBeInTheDocument();
    expect(aboutImg.src).toBe(imgSrc);
  });
});
