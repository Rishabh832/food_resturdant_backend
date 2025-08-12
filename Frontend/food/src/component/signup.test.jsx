import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import Signup from '../components/signupForm';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div data-testid="toast-container" />,
}));


// Mock useNavigate
const mockNavigate = jest.fn();
jest.mock('react-router-dom', () => ({
  ...jest.requireActual('react-router-dom'),
  useNavigate: () => mockNavigate,
}));

const renderWithRouter = (ui) => render(<BrowserRouter>{ui}</BrowserRouter>);

describe('signup component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('render all form fields and button', () => {
    renderWithRouter(<Signup />);
    expect(screen.getByPlaceholderText(/Enter username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Sign Up/i })).toBeInTheDocument();
  });

  test('show error already account', async () => {
    axios.post.mockRejectedValue(new Error('Signup failed. Try again."'));
    renderWithRouter(<Signup />);

    fireEvent.change(screen.getByPlaceholderText(/Enter username/i), {
      target: { value: 'rishabh' },
    });
    fireEvent.change(screen.getByPlaceholderText(/password/i), {
      target: { value: '12' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('SignUp Failed ❌');
      expect(screen.getByText(/Signup failed. Try again./i)).toBeInTheDocument();
    });
  });

test('successful signup', async () => {
  jest.useFakeTimers(); // ⏳ enable timer mocking

  axios.post.mockResolvedValue({
    data: { username: 'rishabh', password: '123' },
  });

  renderWithRouter(<Signup />);

  fireEvent.change(screen.getByPlaceholderText(/Enter username/i), {
    target: { value: 'rishabh' },
  });
  fireEvent.change(screen.getByPlaceholderText(/password/i), {
    target: { value: '123' },
  });

  fireEvent.click(screen.getByRole('button', { name: /Sign up/i }));

  // Wait for axios post call
  await waitFor(() => {
    expect(axios.post).toHaveBeenCalledWith(
      'http://localhost:5000/api/signup',
      { username: 'rishabh', password: '123' }
    );
  });

  // ⏩ fast-forward timer (run the timeout)
  jest.runAllTimers();

  // ✅ now we can check navigate
  expect(mockNavigate).toHaveBeenCalledWith('/login');

  jest.useRealTimers(); // 🔄 reset after test
});

});
