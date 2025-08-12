import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import EditProfile from '../Profile/Editprofile';
import { BrowserRouter } from 'react-router-dom';
import axios from 'axios';
import { toast } from 'react-toastify';

jest.mock('axios')

jest.mock('react-toastify', () => ({
    toast: {
        success: jest.fn(),
        error: jest.fn(),
    }
}))

let editmockuser = {
    full_name: 'rishabh',
    email: 'rishabh@gmail.com',
    phone: '5654534',
    address: 'faridabad',
    profile_image: 'dsf'
}
let emptyeditmockuser = {
    full_name: '',
    email: '',
    phone: '',
    address: '',
    profile_image: ''
}

const renderComponent = () => {
    render(
        <BrowserRouter>

            <EditProfile />

        </BrowserRouter>
    )
}

describe('EditProfile test component', () => {
    beforeEach(() => {
        jest.clearAllMocks()
    })
    test('All form elements appear properly on screen', () => {
        renderComponent();
        expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Phone/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/address/i)).toBeInTheDocument();
        expect(screen.getByLabelText(/Profile Image URL/i)).toBeInTheDocument();
        expect(screen.getByRole('button', { name: /save/i })).toBeInTheDocument()

    })

    test('API Response Prefill Test', async () => {
        axios.get.mockResolvedValue({ data: editmockuser })

        renderComponent()
        await waitFor(() => {
            expect(screen.getByDisplayValue('rishabh')).toBeInTheDocument()
            expect(screen.getByDisplayValue('rishabh@gmail.com')).toBeInTheDocument()
            expect(screen.getByDisplayValue('5654534')).toBeInTheDocument()
            expect(screen.getByDisplayValue('faridabad')).toBeInTheDocument()
            expect(screen.getByRole('button', { name: /save/i }))
        })

    })

    test('submit the form with correct data', async () => {
        axios.get.mockResolvedValue({ data: editmockuser });
        axios.put.mockResolvedValue({ data: editmockuser });

        renderComponent();


        await waitFor(() => {
            expect(screen.getByDisplayValue('rishabh')).toBeInTheDocument();
        });

        // Now simulate input changes
        fireEvent.change(screen.getByLabelText(/Full name/i), {
            target: { value: 'rohan' }
        });
        fireEvent.change(screen.getByLabelText(/Email/i), {
            target: { value: 'rohan@gmail.com' }
        });
        fireEvent.change(screen.getByLabelText(/Phone/i), {
            target: { value: '12345' }
        });
        fireEvent.change(screen.getByLabelText(/Address/i), {
            target: { value: 'Delhi' }
        });

        fireEvent.click(screen.getByRole('button', { name: /save/i }));

        await waitFor(() => {
            expect(axios.put).toHaveBeenCalledWith(
                'http://localhost:5000/api/profile/profile_edit',
                expect.objectContaining({
                    full_name: 'rohan',
                    email: 'rohan@gmail.com',
                    phone: '12345',
                    address: 'Delhi',
                    profile_image: 'dsf'
                }),
                expect.objectContaining({ withCredentials: true })
            );
            expect(toast.success).toHaveBeenCalledWith('Profile updated successfully');
        });
    });

    test('handle api during error', async () => {
        axios.get.mockResolvedValue({ data: editmockuser })
        axios.put.mockRejectedValue(new Error('Internal server Error'))

        renderComponent()

        await waitFor(() => {
            expect(screen.getByDisplayValue('rishabh')).toBeInTheDocument();
        })
        fireEvent.click(screen.getByRole('button', { name: /save/i }))

        await waitFor(() => {
            expect(toast.error).toHaveBeenCalledWith('Profile update failed')
        })
    })

test('sets default values when profile fields are missing', async () => {
  const partialData = { full_name: 'Rishabh', email: 'r@gmail.com' }; // phone, address, image missing
  axios.get.mockResolvedValue({ data: partialData });

  renderComponent();

  await waitFor(() => {
    
    // Empty fields — check by placeholder
    expect(screen.getByLabelText(/Full Name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Email/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/Phone/i)).toHaveValue('');
    expect(screen.getByLabelText(/Address/i)).toHaveValue('');
    expect(screen.getByLabelText(/Profile Image URL/i)).toHaveValue('');
  });
});



})