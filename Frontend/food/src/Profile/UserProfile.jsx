import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Logoutbtn from '../base/Logoutbtn'
import { useNavigate } from 'react-router-dom';
import API_URL from '../api';

const UserProfile = () => {
  const [user, setUser] = useState(null);
  const navigate = useNavigate();

  const add = () => navigate('/addprofile');
  const goToEdit = () => navigate('/edit');

  useEffect(() => {
    const profile = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/profile/user_profile`, {
          withCredentials: true,
        });
        setUser(res.data);
        console.log(res.data);
        
      } catch (err) {
        console.error('Error fetching profile:', err);
      }
    };

    profile();
  }, []);

  if (!user) {
    return <p className="text-center mt-10">Loading profile...</p>;
  }

  return (
    <div className="max-w-xl mx-auto mt-10 bg-white shadow-lg rounded-lg p-6">
      <div className="flex flex-col items-center text-center">
        <img
          src={user.profile_image || 'https://img.freepik.com/premium-vector/user-profile-icon-flat-style-member-avatar-vector-illustration-isolated-background-human-permission-sign-business-concept_157943-15752.jpg'}
          alt="Profile"
          className="w-28 h-28 rounded-full border-4 border-orange-500 shadow-md"
        />
        <h2 className="text-2xl font-bold mt-4">{user.full_name || 'No Name Added'}</h2>
        <p className="text-gray-600">{user.email || 'No Email'}</p>
        <p className="text-gray-600">{user.phone || 'No Phone'}</p>
        <p className="text-gray-500 mt-1">{user.address || 'No Address'}</p>
        <p className="text-sm text-gray-400 mt-1">Joined on {user.created_at || 'N/A'}</p>
      </div>

      <hr className="my-6" />

      <div className="flex justify-between">
        {user.full_name && user.email && user.phone && user.address ? (
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={goToEdit}>
            Edit
          </button>
        ) : (
          <button className="bg-green-600 hover:bg-green-700 text-white px-4 py-2 rounded" onClick={add}>
            Add Profile
          </button>
        )}

        <Logoutbtn />
      </div>
    </div>
  );
};

export default UserProfile;
