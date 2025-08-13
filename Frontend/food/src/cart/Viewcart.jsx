import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Order_place from '../order_success/Order_place';
import Historynav from '../base/Historynav';
import API_URL from '../api';

const Viewcart = () => {
  const [data, setData] = useState([]);

  const refreshCart = async () => {
    try {
      const res = await axios.get(`${API_URL}/api/cart/view_cart`, {
        withCredentials: true,
      });
      setData(res.data);
    } catch (error) {
      console.error('Error refreshing cart:', error);
    }
  };

  useEffect(() => {
    refreshCart();
  }, []);

  const total = data.reduce(
    (acc, item) => acc + (item.price || 0) * item.quantity,
    0
  );

  const increase = async (itemId) => {
    try {
      await axios.post(`${API_URL}/api/cart/add_cart`, {
        item_id: itemId,
      }, { withCredentials: true });
      refreshCart();
    } catch (error) {
      console.error("Failed to increase quantity", error);
    }
  };

  const decrease = async (itemId) => {
    try {
      await axios.post(`${API_URL}/api/cart/decrease_cart/${itemId}`, {}, {
        withCredentials: true,
      });
      refreshCart();
    } catch (error) {
      console.error("Failed to decrease quantity", error);
    }
  };

  const remove = async (itemId) => {
    try {
      await axios.delete(`${API_URL}/api/cart/remove_cart/${itemId}`, {
        withCredentials: true,
      });
      refreshCart();
    } catch (error) {
      console.error("Failed to remove item", error);
    }
  };

  return (
    <>
      <Historynav />
      <div className="max-w mx-auto px-4 mt-28">
        <h1 className="text-3xl font-bold mb-6 text-center text-red-500">🛒 Your Cart</h1>

        {data.length === 0 ? (
          <p className="text-center text-gray-500 text-xl">Your cart is empty 🛒</p>
        ) : (
          <>
            {data.map((item) => (
              <div key={item.order_item_id} className="mb-6">
                <div className="flex flex-col md:flex-row justify-between items-center bg-white shadow-lg p-4 rounded-lg">
                  <div className="flex-1">
                    <h2 className="text-xl font-semibold">{item.name}</h2>
                    <p className="text-gray-600">Price: ₹{item.price}</p>
                    <p className="text-gray-600 text-sm">Item Total: ₹{item.price * item.quantity}</p>
                  </div>

                  <div className="flex items-center mt-4 md:mt-0 space-x-3">
                    <button
                      onClick={() => decrease(item.menu_item_id)}
                      className="px-3 py-1 bg-red-500 text-white rounded hover:bg-red-600"
                    >
                      −
                    </button>

                    <span className="px-3 font-semibold text-lg">{item.quantity}</span>

                    <button
                      onClick={() => increase(item.menu_item_id)}
                      className="px-3 py-1 bg-green-500 text-white rounded hover:bg-green-600"
                    >
                      +
                    </button>
                  </div>

                  <button
                    onClick={() => remove(item.order_item_id)}
                    className="mt-4 md:mt-0 text-red-600 hover:underline text-sm ml-4"
                  >
                    Remove
                  </button>
                </div>
              </div>
            ))}

            <div className="mt-10 text-right">
              <h2 className="text-2xl font-bold mr-2 text-green-600">Total: ₹ {total}</h2>
              <div className="mt-4 inline-block">
                <Order_place />
              </div>
            </div>
          </>
        )}
      </div>
    </>
  );
};

export default Viewcart;
