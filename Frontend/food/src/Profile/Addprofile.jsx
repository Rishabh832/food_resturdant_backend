import axios from 'axios';
import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';        
import 'react-toastify/dist/ReactToastify.css'; 

const AddProfile = () => {
  const [form, setForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    profile_image: ''
  });


  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const Addprofile = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://localhost:5000/api/profile/username', form, {
        withCredentials: true
      });
      setForm({
        full_name: '',
        email: '',
        phone: '',
        address: '',
        profile_image: ''
      });
      toast.success("Profile created successfully!")
      window.history.back()
      
    } catch (err) {
      console.error("Error:", err);
      toast.error("Failed to create profile")
    }
  };

  return (
    <div className="max-w-md mx-auto mt-10 p-6 border rounded-xl shadow-md">
      <h2 className="text-2xl font-semibold mb-4">Create Profile</h2>
      <form onSubmit={Addprofile} className="space-y-4">
        <input type="text" name="full_name" value={form.full_name} onChange={handleChange} placeholder="Full Name" className="w-full p-2 border rounded" required/>
        <input type="email" name="email" value={form.email} onChange={handleChange} placeholder="Email" className="w-full p-2 border rounded" required/>
        <input type="text" name="phone" value={form.phone} onChange={handleChange} placeholder="Phone" className="w-full p-2 border rounded" required/>
        <input type="text" name="profile_image" value={form.profile_image} onChange={handleChange} placeholder="Profile Image URL" className="w-full p-2 border rounded" required/>
        <textarea name="address" value={form.address} onChange={handleChange} placeholder="Address" className="w-full p-2 border rounded"  required></textarea>
        <button type="submit" className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700">Add Profile</button>
      </form>
    </div>
  );
};

export default AddProfile;
