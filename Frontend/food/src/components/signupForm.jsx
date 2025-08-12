import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import axios from 'axios'
import { toast, ToastContainer } from 'react-toastify';


const SignupForm = () => {
  const [form, setForm] = useState({ username: '', password: '' });
  const [error,seterror] = useState('')

  let navigate = useNavigate()
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    seterror('')
    try {
      await axios.post('http://localhost:5000/api/signup', form);
      setForm({username: '', password: '' })
      toast.success('SignUp Successfully ✔️')
      setTimeout(() => {
        navigate('/login')
      }, 1400);
    } catch (err) {
       seterror("Signup failed. Try again.");
      toast.error('SignUp Failed ❌')
    }
  };

  return (
    <div className="flex items-center justify-center min-h-screen bg-gradient-to-br from-blue-100 via-purple-100 to-pink-200 px-4">
      <ToastContainer/>
      <form
        onSubmit={handleSubmit}
        className="w-full max-w-md bg-white rounded-2xl shadow-2xl p-8 space-y-6 animate-fadeIn"
      >
        <h2 className="text-3xl font-extrabold text-center text-gray-800">
          Create an Account
        </h2>


          {error && (
          <p className="text-red-600 text-center font-medium -mb-2">{error}</p>
        )}



        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Username</label>
          <input
            type="text"
            placeholder="Enter username"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onChange={(e) => setForm({ ...form, username: e.target.value })}
            required
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-gray-700 mb-1">Password</label>
          <input
            type="password"
            placeholder="Enter a strong password"
            className="w-full px-4 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 transition-all"
            onChange={(e) => setForm({ ...form, password: e.target.value })}
            required
          />
        </div>

        <button
          type="submit"
          className="w-full py-2 bg-purple-600 hover:bg-purple-700 text-white font-semibold rounded-lg shadow-md transition duration-300"
        >
          Sign Up
        </button>

        <p className="text-sm text-center text-gray-600">
          Already have an account?{' '}
          <Link to="/login" className="text-purple-600 hover:underline font-medium">
            Login here
          </Link>
        </p>
      </form>
    </div>
  );
};

export default SignupForm;
