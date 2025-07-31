import React from 'react';
import logo from '../assets/images/logo.png';

const Navbar = () => {
  return (
    <nav className="bg-white shadow-md fixed w-full z-20 top-0 start-0 border-b border-gray-200">
      <div className="max-w-screen-xl mx-auto flex flex-wrap items-center justify-between p-4">
        
        {/* Logo and Brand Name */}
        <a href="/" className="flex items-center space-x-3">
          <img src={logo} className="h-12 w-12 rounded-full" alt="Logo" />
          <span className="text-2xl font-bold text-gray-800">Restudant</span>
        </a>

        {/* Nav Links */}
        <div className="hidden md:flex md:items-center md:space-x-8">
          <a href="/menu" className="text-gray-700 hover:text-blue-600 font-medium">Home</a>
          <a href="/myorders" className="text-blue-600 font-semibold hover:text-blue-800">Order History</a>
          <a href="/profile" className="text-gray-700 hover:text-blue-600 font-medium">Profile</a>
        </div>

        {/* Logout Button */}
        <div className="md:order-2">
          <button className="bg-red-500 text-white px-4 py-2 rounded hover:bg-red-600 transition duration-200">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
