import React from 'react';
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import '@testing-library/jest-dom'
import axios from 'axios';
import UseProfile from '../Profile/UserProfile'
import { BrowserRouter, useNavigate } from 'react-router-dom';
import AddProfile from '../Profile/Addprofile';

jest.mock('axios');

// Mock userNavigate

const mockNavigate = jest.fn()
jest.mock('react-router-dom',()=>({
    ...jest.requireActual('react-router-dom'),
    useNavigate: () => mockNavigate,
}))

const mockuser ={
                    full_name: 'rishabh',
                    email: 'rishabh@gmail.com',
                    phone: '5654534',
                    address: 'faridabad',
                    profile_image: 'dsf'
}

const incompletemockuser ={
                    full_name: '',
                    email: '',
                    phone: '',
                    address: '',
                    profile_image: ''

}

const renderComponent =()=>{
    render(
        <BrowserRouter>
            <UseProfile/>
        </BrowserRouter>
    )
}

describe('UserProfile Component',()=>{
    test('API call test',async()=>{
        axios.get.mockResolvedValue({data:mockuser})

        renderComponent()
        await waitFor(()=>{
            expect(screen.getByRole('heading',{name:/rishabh/i})).toBeInTheDocument()
            expect(screen.getByText(/rishabh@gmail.com/i)).toBeInTheDocument()
            expect(screen.getByText(/5654534/i)).toBeInTheDocument()
            expect(screen.getByText(/faridabad/i)).toBeInTheDocument()
            expect(screen.getByRole('button',{name: /Edit/i})) 
        })

    })

    test('Loading Profile test', ()=>{

        axios.get.mockImplementation(()=> new Promise(()=>{}))
        
        renderComponent()

        expect(screen.getByText(/loading profile.../i)).toBeInTheDocument()
    })

    test('conditional button render test complete profile',async()=>{
        axios.get.mockResolvedValue({data:mockuser})

        renderComponent()
        await waitFor(()=>{
            expect(screen.getByText(/Edit/i)).toBeInTheDocument()
        })

    })

    test('conditional button render test incomplete profile',async()=>{
        axios.get.mockResolvedValue({data:incompletemockuser})

        renderComponent()
        await waitFor(()=>{
            expect(screen.getByText(/Add Profile/i)).toBeInTheDocument()
        })
    })

    test('Navigation to Edit Test (on button click)',async()=>{
        axios.get.mockResolvedValue({
            data:mockuser
        })
        renderComponent()

        await waitFor(()=>{
            fireEvent.click(screen.getByRole('button',{name: /Edit/i}))
        })
        expect(mockNavigate).toHaveBeenCalledWith('/edit')

    })
    test('Navigation to Add Test (on button click)',async()=>{
        axios.get.mockResolvedValue({
            data:incompletemockuser
        })
        renderComponent()

        await waitFor(()=>{
            fireEvent.click(screen.getByRole('button',{name: /Add Profile/i}))
        })
        expect(mockNavigate).toHaveBeenCalledWith('/addprofile')

    })
    test('error fetching profile data',async()=>{
         const consoleSpy = jest.spyOn(console, 'error').mockImplementation(() => {});
         const mockError = new Error('Network Error');
        axios.get.mockRejectedValue(mockError)

        renderComponent()

        await waitFor(()=>{
            expect(consoleSpy).toHaveBeenCalledWith('Error fetching profile:',mockError)
        })
        consoleSpy.mockRestore();

    })
})