import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import axios from 'axios';
import AddProfile from '../Profile/Addprofile';
import { BrowserRouter, useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

jest.mock('axios');

jest.mock('react-toastify', () => ({
  toast: {
    success: jest.fn(),
    error: jest.fn(),
  }
}));


const renderComponent = () =>
    render(
        <BrowserRouter>
            <AddProfile />
        </BrowserRouter>
    );

describe('Addprofile test', () => {

    test('render all form fields and button', () => {
        renderComponent();
        expect(screen.getByPlaceholderText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Email/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Phone/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Profile Image URL/i)).toBeInTheDocument();
        expect(screen.getByPlaceholderText(/Address/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /Add Profile/i })).toBeInTheDocument()

    })

    test('submit the form with correct data', async () => {
        axios.post.mockResolvedValue({ data: { message: 'Profile added' } });

        renderComponent()

        fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
            target: { value: 'rishabh' }
        })
        fireEvent.change(screen.getByPlaceholderText(/Email/i), {
            target: { value: 'rishabh@gmail.com' }
        })
        fireEvent.change(screen.getByPlaceholderText(/Phone/i), {
            target: { value: '5654534' }
        })
        fireEvent.change(screen.getByPlaceholderText(/Profile Image URL/i), {
            target: { value: 'dsf' }
        })
        fireEvent.change(screen.getByPlaceholderText(/Address/i), {
            target: { value: 'faridabad' }
        })
        fireEvent.click(screen.getByRole('button', { name: /Add Profile/i }));


        await waitFor(() => {
            expect(axios.post).toHaveBeenCalledWith(
                expect.any(String),
                expect.objectContaining({
                    full_name: 'rishabh',
                    email: 'rishabh@gmail.com',
                    phone: '5654534',
                    address: 'faridabad',
                    profile_image: 'dsf'

                }), { withCredentials: true }

            );
        })
    })

    test('Failed to create profile',async()=>{
        const consoleSpy = jest.spyOn(console,'error').mockImplementation(()=>{})
        const mockError = new Error('Network Error')
        axios.post.mockRejectedValue(mockError)

        renderComponent()

          fireEvent.change(screen.getByPlaceholderText(/Full Name/i), {
    target: { value: 'rishabh' }
  });
  fireEvent.change(screen.getByPlaceholderText(/Email/i), {
    target: { value: 'rishabh@gmail.com' }
  });
  fireEvent.change(screen.getByPlaceholderText(/Phone/i), {
    target: { value: '1234567890' }
  });
  fireEvent.change(screen.getByPlaceholderText(/Profile Image URL/i), {
    target: { value: 'image.jpg' }
  });
  fireEvent.change(screen.getByPlaceholderText(/Address/i), {
    target: { value: 'Faridabad' }
  });

  // Submit the form
  fireEvent.click(screen.getByRole('button', { name: /Add Profile/i }));

        await waitFor(()=>{
            expect(consoleSpy).toHaveBeenCalledWith("Error:", expect.any(Error))

            expect(toast.error).toHaveBeenCalledWith('Failed to create profile');
        })
        consoleSpy.mockRestore();
        
    })

})