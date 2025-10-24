import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const Cart = () => {
  const [cart, setCart] = useState([]);
  const [products, setProducts] = useState({});
  const navigate = useNavigate();

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/cart', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setCart(res.data);
        // Fetch product details for each item
        res.data.forEach(item => {
          axios.get(`http://localhost:5000/api/products/${item.productId}`)
            .then(prodRes => {
              setProducts(prev => ({ ...prev, [item.productId]: prodRes.data }));
            });
        });
      });
  }, []);

  const updateQuantity = async (productId, quantity) => {
    const token = localStorage.getItem('token');
    try {
      await axios.put(`http://localhost:5000/api/cart/${productId}`, { quantity }, { headers: { Authorization: `Bearer ${token}` } });
      setCart(prev => prev.map(item => item.productId === productId ? { ...item, quantity } : item));
    } catch (err) {
      alert('Update failed');
    }
  };

  const removeItem = async (productId) => {
    const token = localStorage.getItem('token');
    try {
      await axios.delete(`http://localhost:5000/api/cart/${productId}`, { headers: { Authorization: `Bearer ${token}` } });
      setCart(prev => prev.filter(item => item.productId !== productId));
    } catch (err) {
      alert('Remove failed');
    }
  };

  const checkout = async () => {
    const token = localStorage.getItem('token');
    const total = cart.reduce((sum, item) => sum + item.quantity * (products[item.productId]?.price || 0), 0);
    const items = cart.map(item => ({ product: item.productId, quantity: item.quantity, price: products[item.productId]?.price || 0 }));
    try {
      await axios.post('http://localhost:5000/api/orders', { items, total }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Order placed successfully');
      setCart([]);
      navigate('/orders');
    } catch (err) {
      alert('Checkout failed');
    }
  };

  const total = cart.reduce((sum, item) => sum + item.quantity * (products[item.productId]?.price || 0), 0);

  return (
    <div className="container mt-5">
      <h2 className="text-success">Shopping Cart</h2>
      {cart.length === 0 ? (
        <p>Your cart is empty.</p>
      ) : (
        <>
          <ul className="list-group">
            {cart.map(item => (
              <li key={item.productId} className="list-group-item d-flex justify-content-between align-items-center">
                <div>
                  <h5>{products[item.productId]?.name || 'Loading...'}</h5>
                  <p>${products[item.productId]?.price || 0} each</p>
                  <div className="d-flex align-items-center">
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.productId, item.quantity - 1)} disabled={item.quantity <= 1}>-</button>
                    <span className="mx-2">Quantity: {item.quantity}</span>
                    <button className="btn btn-sm btn-outline-secondary" onClick={() => updateQuantity(item.productId, item.quantity + 1)}>+</button>
                  </div>
                </div>
                <div>
                  <p>Total: ${(item.quantity * (products[item.productId]?.price || 0)).toFixed(2)}</p>
                  <button className="btn btn-danger btn-sm" onClick={() => removeItem(item.productId)}>Remove</button>
                </div>
              </li>
            ))}
          </ul>
          <div className="mt-3">
            <h4>Total: ${total.toFixed(2)}</h4>
            <button className="btn btn-success" onClick={checkout}>Checkout</button>
          </div>
        </>
      )}
    </div>
  );
};

export default Cart;
