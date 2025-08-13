import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Addtocart from '../cart/Addtocart';
import {useNavigate} from 'react-router-dom'
import API_URL from '../api';


const MenuHomepage = () => {
  const [data, setData] = useState([]);

  let navigate = useNavigate()

  useEffect(() => {
    const apimenuItem = async () => {
      try {
        const response = await axios.get(`${API_URL}/api/menu/`);
        setData(response.data);
        
        
        
      } catch (error) {
        console.error('error fetching data', error);
      }
    };

    apimenuItem();
  }, []);

  

  // const handleAddToCart = (item) => {
    
  //   navigate('/addcart')
  // };

  return (
    <div className="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-4 gap-4 p-4 mt-20">
      {data.map((item) => (
        <div
          key={item.id}
          className="max-w-sm rounded-xl overflow-hidden shadow-md bg-white p-4 hover:shadow-xl transition duration-300"
        >
          
          <img
            className="w-full h-40 object-cover rounded-md"
            src={item.image || 'https://via.placeholder.com/400x300'}
            alt={item.name}
          />

          <div className="py-3">
            <h2 className="text-lg font-bold mb-1 text-gray-800">{item.name}</h2>
            <p className="text-xs text-gray-500 mb-1">
              Category: <span className="font-medium text-blue-600">{item.category}</span>
            </p>
            <p className="text-sm text-gray-700 mb-2">
              {item.description || 'No description'}
            </p>
            <div className="text-base font-semibold text-green-600 mb-2">₹{item.price}</div>

            {/* Add to Cart Button */}
              <Addtocart itemId={item.id}/>
              
          </div>
        </div>
      ))}
    </div>
  );
};

export default MenuHomepage;
