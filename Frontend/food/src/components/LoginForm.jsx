// src/components/LoginForm.jsx

import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';
import 'react-toastify/dist/ReactToastify.css';
import API_URL from '../api';

const LoginForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error, setError] = useState('');


  const handleLogin = async (e) => {
    e.preventDefault();
    setError('');

    try {
      const res = await axios.post(`${API_URL}/api/login`, form, {
        withCredentials: true,
      });

      
      localStorage.setItem('username', res.data.username);
      console.log(res.data.username);
      

      toast.success('Login Successful!');
      setTimeout(() => {
        window.location.href = '/menu';
      }, 1000);
    } catch (err) {
      setError('Login failed');
      toast.error('Login Failed!');
    }
  };

  return (
    <div className="flex justify-center items-center h-screen bg-gray-100">
      <form onSubmit={handleLogin} className="bg-white p-8 rounded-xl shadow-md w-96">
        <h2 className="text-2xl font-bold mb-6 text-center">Login</h2>
        {error && <p className="text-red-600 text-center font-medium -mb-2">{error}</p>}
        <input
          type="text"
          placeholder="Username"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          onChange={(e) => setForm({ ...form, username: e.target.value })}
        />
        <input
          type="password"
          placeholder="Password"
          className="w-full p-3 mb-4 border border-gray-300 rounded-lg"
          onChange={(e) => setForm({ ...form, password: e.target.value })}
        />
        <button type="submit" className="w-full bg-blue-600 text-white py-3 rounded-lg hover:bg-blue-700 transition">
          Login
        </button>
        <ToastContainer position="top-center" autoClose={1000} />
        <p className="mt-6 text-center text-sm text-gray-600">
          New user?{' '}
          <Link to="/signup" className="text-blue-500 hover:underline">
            Sign up here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default LoginForm;
