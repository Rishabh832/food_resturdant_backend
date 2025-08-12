import axios from 'axios';
import React, { useState, useEffect } from 'react';
import {useNavigate} from 'react-router-dom'
import { toast, ToastContainer } from 'react-toastify';        
import 'react-toastify/dist/ReactToastify.css';  

const EditProfile = () => {
  const [editForm, setEditForm] = useState({
    full_name: '',
    email: '',
    phone: '',
    address: '',
    profile_image: ''
  });

  let navigate = useNavigate()

  // Fetch profile on mount and fill form
  useEffect(() => {
    fetchProfile();
  }, []);

  const fetchProfile = async () => {
    try {
      const res = await axios.get('http://localhost:5000/api/profile/user_profile', {
        withCredentials: true,
      });

      // Set form data with existing user profile
      const data = res.data;
      setEditForm({
        full_name: data.full_name || '',
        email: data.email || '',
        phone: data.phone || '',
        address: data.address || '',
        profile_image: data.profile_image || ''
      });

    } catch (err) {
      console.error("Error fetching profile:", err);
      toast.error("Failed to load profile")
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setEditForm(prev => ({ ...prev, [name]: value }));
  };

  const saveEditData = async () => {
    try {
      await axios.put('http://localhost:5000/api/profile/profile_edit', editForm, {
        withCredentials: true
      });
      toast.success('Profile updated successfully')
      window.history.back()
    } catch (err) {
      console.error("Failed to update profile:", err);
      toast.error('Profile update failed')
    }
  };

  return (
    <div className="max-w-xl mx-auto mt-10 p-6 bg-white rounded-xl shadow-md">
      <h2 className="text-2xl font-bold mb-4 text-center text-blue-600">Edit Profile</h2>

      <form
        onSubmit={(e) => {
          e.preventDefault();
          saveEditData();
        }}
        className="space-y-4"
      >
        <InputField label="Full Name" name="full_name" value={editForm.full_name} onChange={handleInputChange} />
        <InputField label="Email" name="email" value={editForm.email} onChange={handleInputChange} type="email" />
        <InputField label="Phone" name="phone" value={editForm.phone} onChange={handleInputChange} />
        <InputField label="Address" name="address" value={editForm.address} onChange={handleInputChange} />
        <InputField label="Profile Image URL" name="profile_image" value={editForm.profile_image} onChange={handleInputChange} />

    

        <div className="flex justify-end mt-6">
          <button
            type="submit"
            className="bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700 transition"
          
          >
            Save
          </button>
        </div>
      </form>
    </div>
  );
};

const InputField = ({ label, name, value, onChange, type = "text" }) => (
  <div>
    <label className="block text-gray-700 font-medium mb-1" htmlFor={name}>{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      value={value}
      onChange={onChange}
      required
      className="w-full border border-gray-300 rounded px-3 py-2"
    />
  </div>
);

export default EditProfile;
