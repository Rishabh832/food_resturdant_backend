import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import LoginForm from '../components/LoginForm';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

// Mock axios and toastify
jest.mock('axios');
jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  },
  ToastContainer: () => <div />,
}));

// Helper to wrap with Router
const renderWithRouter = (ui) => {
  return render(<BrowserRouter>{ui}</BrowserRouter>);
};

describe('LoginForm Component', () => {
  beforeEach(() => {
    localStorage.clear();
    jest.clearAllMocks();
  });

  test('renders all form fields and button', () => {
    renderWithRouter(<LoginForm />);
    expect(screen.getByPlaceholderText(/Username/i)).toBeInTheDocument();
    expect(screen.getByPlaceholderText(/Password/i)).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /Login/i })).toBeInTheDocument();
  });

  test('shows error toast and error message on failed login', async () => {
    axios.post.mockRejectedValue(new Error('Login failed'));
    renderWithRouter(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'wronguser' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: 'wrongpass' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(toast.error).toHaveBeenCalledWith('Login Failed!');
      expect(screen.getByText(/Login failed/i)).toBeInTheDocument();
    });
  });

  test('successful login sets localStorage and redirects', async () => {
    // Proper mock for window.location
    delete window.location;
    window.location = { href: '', assign: jest.fn() };

    axios.post.mockResolvedValue({ data: { username: 'rishabh' } });

    renderWithRouter(<LoginForm />);

    fireEvent.change(screen.getByPlaceholderText(/Username/i), {
      target: { value: 'rishabh' },
    });
    fireEvent.change(screen.getByPlaceholderText(/Password/i), {
      target: { value: '123456' },
    });
    fireEvent.click(screen.getByRole('button', { name: /Login/i }));

    await waitFor(() => {
      expect(axios.post).toHaveBeenCalledWith(
        'http://localhost:5000/api/login',
        { username: 'rishabh', password: '123456' },
        { withCredentials: true }
      );
      expect(localStorage.getItem('username')).toBe('rishabh');
      expect(toast.success).toHaveBeenCalledWith('Login Successful!');
    });
  });
});
