import React from 'react';
import { screen } from '@testing-library/react';
import renderWithRouter from './helpers/renderWIthRouter';
import NotFound from '../components/NotFound';

describe('Testando component NotFound', () => {
  beforeEach(() => renderWithRouter(<NotFound />));
  test('Testando se existe uma tag "h2" no componente.', () => {
    const aboutTitle = screen.getByRole('heading',
      { name: /Page requested not found/i, level: 2 });
    expect(aboutTitle).toBeInTheDocument();
  });
  test('Testando se existe uma tag "img" no componente com URL correta.', () => {
    const imgSrc = 'https://media.giphy.com/media/kNSeTs31XBZ3G/giphy.gif';
    const imgAlt = 'Pikachu crying because the page requested was not found';
    const notFoundImg = screen.getByAltText(imgAlt);
    expect(notFoundImg).toBeInTheDocument();
    expect(notFoundImg.src).toBe(imgSrc);
  });
});
