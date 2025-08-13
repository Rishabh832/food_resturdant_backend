import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const MenuListItem = () => {
  const [menu, setMenu] = useState([]);
  const [editItem, setEditItem] = useState(null);
  const [editForm, setEditForm] = useState({
    name: '',
    image: '',
    description: '',
    price: '',
    category: ''
  });

  const fetchMenu = () => {
    axios.get(`${API_URL}/api/menu/`)
      .then(res => setMenu(res.data));
  };

  useEffect(() => {
    fetchMenu();
  }, []);

  const deleteItem = (id) => {
    axios.delete(`${API_URL}/api/menu/remove/${id}`, { withCredentials: true })
      .then(fetchMenu);
  };

  const startEdit = (item) => {
    setEditItem(item.id);
    setEditForm({
      name: item.name,
      image: item.image,
      description: item.description,
      price: item.price,
      category: item.category
    });
  };

  const saveEdit = () => {
    axios.put(`${API_URL}/api/menu/update/${editItem}`, editForm)
      .then(() => {
        setEditItem(null);
        fetchMenu();
      });
  };

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h3 className="text-2xl font-bold mb-4 text-center">Menu Items</h3>
      {menu.map(item => (
        <div
          key={item.id}
          className="bg-white shadow-md rounded-lg p-4 mb-4 flex justify-between items-center"
        >
          {editItem === item.id ? (
            <div className="w-full">
              <div className="flex flex-col sm:flex-row sm:gap-4 mb-2">
                <input
                  className="border p-2 rounded w-full mb-2 sm:mb-0"
                  placeholder="Name"
                  value={editForm.name}
                  onChange={e => setEditForm({ ...editForm, name: e.target.value })}
                required/>
                <input
                  className="border p-2 rounded w-full mb-2 sm:mb-0"
                  placeholder="Enter URL for Image"
                  value={editForm.image}
                  onChange={e => setEditForm({ ...editForm, image: e.target.value })} required
                />
                <input
                  className="border p-2 rounded w-full mb-2 sm:mb-0"
                  placeholder="description"
                  value={editForm.description}
                  onChange={e => setEditForm({ ...editForm, description: e.target.value })} required
                />
                <input
                  className="border p-2 rounded w-full"
                  placeholder="Price"
                  type="number"
                  value={editForm.price}
                  onChange={e => setEditForm({ ...editForm, price: e.target.value })} required
                />
                <input
                  className="border p-2 rounded w-full"
                  placeholder="Category"
                  value={editForm.category}
                  onChange={e => setEditForm({ ...editForm, category: e.target.value })} required
                />
              </div>
              <div className="flex gap-2">
                <button
                  className="bg-green-500 text-white px-4 py-1 rounded hover:bg-green-600"
                  onClick={saveEdit}
                >
                  Save
                </button>
                <button
                  className="bg-gray-400 text-white px-4 py-1 rounded hover:bg-gray-500"
                  onClick={() => setEditItem(null)}
                >
                  Cancel
                </button>
              </div>
            </div>
          ) : (
            <div className="flex justify-between w-full items-center">
              <span className="text-lg font-medium">
                {item.name} - ₹{item.price}
              </span>
              <div className="flex gap-2">
                <button
                  className="bg-blue-500 text-white px-3 py-1 rounded hover:bg-blue-600"
                  onClick={() => startEdit(item)}
                >
                  Edit
                </button>
                <button
                  className="bg-red-500 text-white px-3 py-1 rounded hover:bg-red-600"
                  onClick={() => deleteItem(item.id)}
                >
                  Delete
                </button>
              </div>
            </div>
          )}
        </div>
      ))}
    </div>
  );
};

export default MenuListItem;
