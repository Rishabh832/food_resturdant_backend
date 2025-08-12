import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Logout from '../components/Logout';
import Signup from '../components/signupForm'
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios');

// Mock for navigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('Logout Component', () => {
  beforeEach(() => {
    localStorage.setItem('username', 'rishabh');
    jest.clearAllMocks();
  });

  test('logs out successfully, clears storage, and navigates to /login', async () => {
    axios.post.mockResolvedValue({});

    renderWithRouter(<Logout />);
    fireEvent.click(screen.getByText(/Logout/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/logout',
        {},
        { withCredentials: true }
      );
      expect(localStorage.getItem('username')).toBeNull();
      expect(mockNavigate).toHaveBeenCalledWith('/login');
    });
  });

  test('handles logout error without navigating', async () => {
    axios.post.mockRejectedValue(new Error('Logout failed'));

    renderWithRouter(<Logout />);
    fireEvent.click(screen.getByText(/Logout/i));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalled();
      expect(mockNavigate).not.toHaveBeenCalled();
    });
  });
});


