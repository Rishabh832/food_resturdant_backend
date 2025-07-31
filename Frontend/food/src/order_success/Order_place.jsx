import React from 'react'
import axios from 'axios'
import { useNavigate } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';

const Order_place = () => {
  let navigate = useNavigate()
  const ordersuccess = async () => {
    try {
      const res = await axios.post(
        'http://localhost:5000/api/order/placed',
        {},
        {
          withCredentials: true,
        }
      );
      toast.success('🎉 Order placed successfully!', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
      setTimeout(() => {
        navigate('/myorders')
      }, 1400);
    } catch (error) {
      console.error("Error placing order:", error.response?.data || error.message);
       toast.warn('Update your profile first', {
        position: "bottom-right",
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        theme: "colored",
      });
    }
  };

  return (
    <div>
      <ToastContainer/>
      <button
        onClick={ordersuccess}
        className="mt-4 inline-block bg-blue-600 text-white px-6 py-3 rounded hover:bg-blue-700 font-semibold transition"

      >
        Proceed to Checkout
      </button>
    </div>
  );
};

export default Order_place;
