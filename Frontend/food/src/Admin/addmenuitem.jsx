import React, { useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const AddMenuItem = ({ onItemAdded }) => {
  const [form, setForm] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: ''
  });

  const handleSubmit = async (e) => {
    e.preventDefault();
    await axios.post(`${API_URL}/api/menu/add`, form);
    onItemAdded?.(); 
    setForm({ name: '', image: '', description: '', price: '', category: '' });
  };

  return (
    <form
      onSubmit={handleSubmit}
      className="bg-white shadow-lg rounded-lg p-6 w-full max-w-xl mx-auto my-6 space-y-4"
    >
      <h2 className="text-xl font-bold text-center text-gray-700">Add Menu Item</h2>

      <input
        type="text"
        placeholder="Item Name"
        value={form.name}
        onChange={(e) => setForm({ ...form, name: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Image URL"
        value={form.image}
        onChange={(e) => setForm({ ...form, image: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Description"
        value={form.description}
        onChange={(e) => setForm({ ...form, description: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="number"
        placeholder="Price"
        value={form.price}
        onChange={(e) => setForm({ ...form, price: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <input
        type="text"
        placeholder="Category"
        value={form.category}
        onChange={(e) => setForm({ ...form, category: e.target.value })}
        className="w-full p-2 border border-gray-300 rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
      />

      <button
        type="submit"
        className="w-full bg-green-500 hover:bg-green-600 text-white font-semibold py-2 rounded"
      >
        Add Item
      </button>
    </form>
  );
};

export default AddMenuItem;
