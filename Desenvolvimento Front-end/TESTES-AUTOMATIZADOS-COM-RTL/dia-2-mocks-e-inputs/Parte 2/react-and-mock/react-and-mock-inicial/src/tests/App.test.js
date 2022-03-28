import { render, screen } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import App from '../App';
import responseAPI from './mocks';

describe('Test Rick & Morty API', () => {

  beforeEach(async ()=>{
    jest.spyOn(global,'fetch').mockResolvedValue({
      json: jest.fn().mockResolvedValue(responseAPI),
    });
  })

  test('Verifica se aparece o card com titulo de "Rick Sanchez"',async () => {
    render(<App />);
      const title = await screen.findByText(/Rick Sanchez/i);
      expect(title).toBeInTheDocument(); 


  })

  test('Verifica se existem o input de texto e o botão "Buscar"', async () => {
    render(<App />);
    const button = await screen.findByText(/Buscar/i);
    const input = screen.getByRole('textbox');
    expect(button).toBeInTheDocument()
    expect(input).toBeInTheDocument()
   
  })

  test('Verifica se ao buscar por "Smith" aparecem apenas 4 cards',async () => {
    render(<App />);
    const button = await screen.findByText(/Buscar/i);
    const input = screen.getByRole('textbox');
    userEvent.type(input, "Smith");
    expect(input).toHaveValue("Smith");
    userEvent.click(button);
    const requestedCard = await screen.findAllByText(/Smith/i);
    expect(requestedCard).toHaveLength(4);
  })

})