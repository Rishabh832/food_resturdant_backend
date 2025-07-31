import React from 'react';
import logo from '../assets/images/logo.png';
import Loginbtn from './loginbtn';
import Signupbtn from './Signupbtn';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        
        {/* Logo and Brand Name */}
        <a href="/" className="flex items-center space-x-3">
          <img src={logo} className="h-12 w-12 rounded-full" alt="Logo" />
          <span className="text-2xl font-bold text-gray-800">Restudant</span>
        </a>

        {/* Login and Signup Buttons */}
        <div className="flex space-x-2 md:order-2">
          <Loginbtn/>
          <Signupbtn/>
        </div>

        {/* Nav Links */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <a href="/" className="text-blue-600 font-medium hover:text-blue-800">Home</a>
          <a href="/about" className="text-gray-700 hover:text-blue-600">About</a>
          <a href="" className="text-gray-700 hover:text-blue-600">Services</a>
          <a href="" className="text-gray-700 hover:text-blue-600">Contact</a>
        </div>

      </div>
    </nav>
  );
};

export default Navbar;
