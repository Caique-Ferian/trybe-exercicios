import React from 'react';
import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from './App';

describe('Teste da aplicação toda', () => {
  afterEach(() => jest.clearAllMocks());
  it('renderiza o App em seu estado inicial', () => {
    render(<App />);
    const inputAndButton = screen.getAllByText(/Digimon/i);
    const description = screen.getByText(/Faça uma pesquisa/i);
    
    expect(inputAndButton).toHaveLength(2);
    expect(description).toBeInTheDocument();

  });
  it('Insira um valor na caixa de busca', () => {
    render(<App />);
    const input = screen.getByTestId('search-input');

    userEvent.type(input, 'Gabumon');
    expect(input).toHaveValue('Gabumon');
  });
  it('Verifica que a tela começa sem Digimon', () => {
    render(<App />);
    const digimonName = screen.queryByTestId('digimonName');
    expect(digimonName).not.toBeInTheDocument;
  });
  it('Busca por um Digimon', async () => {
    const digimon = [{
      name: 'Agumon',
      level: 'Rookie',
      img: 'https://digimon.shadowsmith.com/img/agumon.jpg',
    }];
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue(digimon),
    });
    render(<App />);
    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Agumon');
    expect(input).toHaveValue('Agumon');

    const button = screen.getByText(/Search Digimon/i);
    userEvent.click(button);

    const digimonName = await screen.findByTestId('digimonName');
    expect(digimonName).toBeInTheDocument();
    const digimonLevel = screen.getByText(/Level: Rookie/i);
    expect(digimonLevel).toBeInTheDocument();
    const digimonImage = screen.getByAltText('Agumon');
    expect(digimonImage).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://digimon-api.vercel.app/api/digimon/name/Agumon');
  });
  it('Busca por um Digimon inexistente', async () => {
    const ErrorMsg = "Impmon is not a Digimon in our database."
    global.fetch = jest.fn().mockResolvedValue({
      json: jest.fn().mockResolvedValue({ErrorMsg}),
    });
    render(<App />);
    const input = screen.getByTestId('search-input');
    userEvent.type(input, 'Impmon');
    expect(input).toHaveValue('Impmon');

    const button = screen.getByText(/Search Digimon/i);
    userEvent.click(button);

    const ErrorText = await screen.findByText('Impmon is not a Digimon in our database.');
    expect(ErrorText).toBeInTheDocument();

    expect(global.fetch).toHaveBeenCalledTimes(1);
    expect(global.fetch).toHaveBeenCalledWith('https://digimon-api.vercel.app/api/digimon/name/Impmon');
  });
  it('Caso a caixa de busca esteja vazia, nenhum fetch é realizado', async () => {
    render(<App />);
    const input = screen.getByTestId('search-input');
    expect(input).toHaveValue('');
    const button = screen.getByText(/Search Digimon/i);
    userEvent.click(button);
    expect(global.fetch).toHaveBeenCalledTimes(0)
  });
});
