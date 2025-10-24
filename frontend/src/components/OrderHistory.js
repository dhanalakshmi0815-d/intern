import React, { useEffect, useState } from 'react';
import axios from 'axios';

const OrderHistory = () => {
  const [orders, setOrders] = useState([]);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/orders', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => setOrders(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2 className="text-success">Your Order History</h2>
      {orders.length === 0 ? (
        <p>No orders found.</p>
      ) : (
        <div className="accordion" id="ordersAccordion">
          {orders.map((order, index) => (
            <div key={order._id} className="accordion-item">
              <h2 className="accordion-header" id={`heading${index}`}>
                <button className="accordion-button" type="button" data-bs-toggle="collapse" data-bs-target={`#collapse${index}`} aria-expanded="true" aria-controls={`collapse${index}`}>
                  Order #{order._id.slice(-6)} - Total: ${order.total.toFixed(2)} - Date: {new Date(order.date).toLocaleDateString()}
                </button>
              </h2>
              <div id={`collapse${index}`} className="accordion-collapse collapse" aria-labelledby={`heading${index}`} data-bs-parent="#ordersAccordion">
                <div className="accordion-body">
                  <ul className="list-group">
                    {order.items.map(item => (
                      <li key={item._id} className="list-group-item d-flex justify-content-between align-items-center">
                        {item.product ? item.product.name : 'Product not found'} - Quantity: {item.quantity}
                        <span>${(item.quantity * item.price).toFixed(2)}</span>
                      </li>
                    ))}
                  </ul>
                  <div className="mt-3">
                    <strong>Total: ${order.total.toFixed(2)}</strong>
                  </div>
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
