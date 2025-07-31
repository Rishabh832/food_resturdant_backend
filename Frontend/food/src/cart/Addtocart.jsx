import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const AddToCart = ({ itemId }) => {
  
  const [response, setResponse] = useState(null);

  const handleAddToCart = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/cart/add_cart',
        { item_id: itemId },
        {
          withCredentials: true,
        }
      );
      setResponse(res.data);
      toast.success("Item added to cart successfully");
      

    } catch (error) {
      console.error('Error adding to cart:', error.response?.data || error.message);
      toast.error('Failed to add item to cart');
    }
  };

  return (
    <div>
    <button
      onClick={handleAddToCart}
      className="bg-purple-600 text-white px-3 py-1 rounded hover:bg-purple-700 text-sm cursor-pointer"
      >
      Add to Cart
    </button>
   
      </div>
      
  );
};

export default AddToCart;
