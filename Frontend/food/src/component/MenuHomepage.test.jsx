import React from 'react';
import { render, screen, waitFor } from '@testing-library/react';
import axios from 'axios';
import MenuHomepage from '../pages/MenuHomepage';
import { BrowserRouter, useNavigate } from 'react-router-dom';

jest.mock('axios');

const mockNavigate = jest.fn()
jest.mock('react-router-dom',()=>({
  ...jest.requireActual('react-router-dom'),
  useNavigate: ()=> mockNavigate,
}))

jest.mock('../cart/Addtocart', () => ({ itemId }) => (
  <button>Add to Cart</button>
));

const mockedData = [
  {
    id: 1,
    name: 'Pizza',
    category: 'Italian',
    description: 'Cheesy and delicious',
    price: 199,
    image: '',
  },
  {
    id: 2,
    name: 'Burger',
    category: 'Fast Food',
    description: '',
    price: 99,
    image: 'https://example.com/burger.jpg',
  }
];

const renderComponent = () =>
  render(
    <BrowserRouter>
      <MenuHomepage />
    </BrowserRouter>
  );

describe('MenuHomepage Component', () => {
  test('fetches and displays menu items', async () => {
    axios.get.mockResolvedValue({ data: mockedData });

    renderComponent();

    // Wait for items to appear
    await waitFor(() => {
      expect(screen.getByText('Pizza')).toBeInTheDocument();
      expect(screen.getByText('Burger')).toBeInTheDocument();
    });

    // Check category
    expect(screen.getByText(/Italian/i)).toBeInTheDocument();
    expect(screen.getByText(/Fast Food/i)).toBeInTheDocument();

    // Check price
    expect(screen.getByText('₹199')).toBeInTheDocument();
    expect(screen.getByText('₹99')).toBeInTheDocument();
  });

  test('shows fallback image when no image is provided', async () => {
    axios.get.mockResolvedValue({ data: mockedData });

    renderComponent();

    const images = await screen.findAllByRole('img');
    expect(images[0].src).toContain('via.placeholder.com');
    expect(images[1].src).toContain('https://example.com/burger.jpg');
  });

  test('renders Addtocart component for each item', async () => {
    axios.get.mockResolvedValue({ data: mockedData });

    renderComponent();

    await waitFor(() => {
      expect(screen.getAllByText('Add to Cart')).toHaveLength(2);
    });
  });

  test('handles API error gracefully', async () => {
    axios.get.mockRejectedValue(new Error('Network Error'));

    const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});

    renderComponent();

    await waitFor(() => {
      expect(consoleSpy).toHaveBeenCalledWith('error fetching data', expect.any(Error));
    });

    consoleSpy.mockRestore();
  });
});
