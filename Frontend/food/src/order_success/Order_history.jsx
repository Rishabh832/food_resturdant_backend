import React, { useEffect, useState } from 'react';
import axios from 'axios';
import API_URL from '../api';

const OrderHistory = () => {
  const [data, setData] = useState(null); 

  useEffect(() => {
    const fetchOrders = async () => {
      try {
        const res = await axios.get(`${API_URL}/api/order/order_success`, {
          withCredentials: true,
        });
        setData(res.data);
      } catch (error) {
        console.error("Error fetching order history:", error);
      }
    };

    fetchOrders();
  }, []);

  return (
    <div className="max-w-4xl mx-auto p-4 sm:p-6">
      <h1 className="text-2xl sm:text-3xl font-bold mb-6 text-center">Order History</h1>

      {!data || !data.orders || data.orders.length === 0 ? (
        <p className="text-center text-gray-500">No orders found.</p>
      ) : (
        <div className="space-y-6">
          {data.orders.map((order, i) => (
            <div
              key={i}
              className="bg-white p-4 sm:p-6 rounded-xl shadow border hover:shadow-lg transition"
            >
              <div className="flex flex-col sm:flex-row sm:justify-between sm:items-center mb-4">
                <div>
                  <h2 className="text-xl font-semibold">{data.full_name}</h2>
                  <p className="text-sm text-gray-500">Order ID: {order.order_id}</p>
                  <p className="text-sm text-gray-500">Ordered on: {order.order_date}</p>
                </div>
                <span className="text-sm px-3 py-1 mt-2 sm:mt-0 rounded-full bg-green-100 text-green-600 w-fit">
                  {order.status || "Confirmed"}
                </span>
              </div>

              <div className="flex items-start gap-4 flex-wrap">
                <img
                  src={order.item_details.image}
                  alt={order.item_details.name}
                  className="w-24 h-24 object-cover rounded-md border"
                />
                <div>
                  <h3 className="text-lg font-medium">{order.item_details.name}</h3>
                  <p className="text-sm text-gray-600">{order.item_details.description}</p>
                  <p className="text-sm text-gray-600 capitalize">Category: {order.item_details.category}</p>
                  <p className="text-sm text-gray-700 mt-1">
                    Quantity: <strong>{order.quantity}</strong>
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
