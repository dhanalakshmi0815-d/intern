import React, { useState, useEffect } from 'react';
import axios from 'axios';

const AdminDashboard = () => {
  const [activeTab, setActiveTab] = useState('users');
  const [users, setUsers] = useState([]);
  const [products, setProducts] = useState([]);
  const [orders, setOrders] = useState([]);
  const [feedbacks, setFeedbacks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    fetchData();
  }, [activeTab]);

  const fetchData = async () => {
    setLoading(true);
    setError('');
    try {
      const token = localStorage.getItem('token');
      const config = { headers: { Authorization: `Bearer ${token}` } };

      if (activeTab === 'users') {
        const res = await axios.get('http://localhost:5000/api/admin/users', config);
        setUsers(res.data);
      } else if (activeTab === 'products') {
        const res = await axios.get('http://localhost:5000/api/admin/products', config);
        setProducts(res.data);
      } else if (activeTab === 'orders') {
        const res = await axios.get('http://localhost:5000/api/admin/orders', config);
        setOrders(res.data);
      } else if (activeTab === 'feedback') {
        const res = await axios.get('http://localhost:5000/api/admin/feedback', config);
        setFeedbacks(res.data);
      }
    } catch (err) {
      setError('Failed to fetch data');
    }
    setLoading(false);
  };

  const updateUserRole = async (id, role) => {
    try {
      const token = localStorage.getItem('token');
      await axios.put(`http://localhost:5000/api/admin/users/${id}`, { role }, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      setError('Failed to update user');
    }
  };

  const deleteUser = async (id) => {
    if (!window.confirm('Are you sure you want to delete this user?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/users/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      setError('Failed to delete user');
    }
  };

  const deleteProduct = async (id) => {
    if (!window.confirm('Are you sure you want to delete this product?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/products/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      setError('Failed to delete product');
    }
  };

  const deleteFeedback = async (id) => {
    if (!window.confirm('Are you sure you want to delete this feedback?')) return;
    try {
      const token = localStorage.getItem('token');
      await axios.delete(`http://localhost:5000/api/admin/feedback/${id}`, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchData();
    } catch (err) {
      setError('Failed to delete feedback');
    }
  };

  return (
    <div className="container mt-4">
      <h2 className="text-success">Admin Dashboard</h2>
      {error && <div className="alert alert-danger">{error}</div>}

      <ul className="nav nav-tabs admin-nav">
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'users' ? 'active' : ''}`} onClick={() => setActiveTab('users')}>Users</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'products' ? 'active' : ''}`} onClick={() => setActiveTab('products')}>Products</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'orders' ? 'active' : ''}`} onClick={() => setActiveTab('orders')}>Orders</button>
        </li>
        <li className="nav-item">
          <button className={`nav-link ${activeTab === 'feedback' ? 'active' : ''}`} onClick={() => setActiveTab('feedback')}>Feedback</button>
        </li>
      </ul>

      <div className="mt-4">
        {loading ? (
          <div>Loading...</div>
        ) : (
          <>
            {activeTab === 'users' && (
              <div>
                <h3>Users</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Email</th>
                      <th>Contact</th>
                      <th>Role</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {users.map(user => (
                      <tr key={user._id}>
                        <td>{user.name}</td>
                        <td>{user.email}</td>
                        <td>{user.contact}</td>
                        <td>
                          <select value={user.role} onChange={(e) => updateUserRole(user._id, e.target.value)}>
                            <option value="user">User</option>
                            <option value="admin">Admin</option>
                          </select>
                        </td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteUser(user._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'products' && (
              <div>
                <h3>Products</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>Name</th>
                      <th>Price</th>
                      <th>Category</th>
                      <th>Description</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {products.map(product => (
                      <tr key={product._id}>
                        <td>{product.name}</td>
                        <td>${product.price}</td>
                        <td>{product.category?.name}</td>
                        <td>{product.description}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteProduct(product._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'orders' && (
              <div>
                <h3>Orders</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Total</th>
                      <th>Date</th>
                      <th>Items</th>
                    </tr>
                  </thead>
                  <tbody>
                    {orders.map(order => (
                      <tr key={order._id}>
                        <td>{order.user?.name} ({order.user?.email})</td>
                        <td>${order.total}</td>
                        <td>{new Date(order.date).toLocaleDateString()}</td>
                        <td>{order.items?.length} items</td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}

            {activeTab === 'feedback' && (
              <div>
                <h3>Feedback</h3>
                <table className="table table-striped">
                  <thead>
                    <tr>
                      <th>User</th>
                      <th>Message</th>
                      <th>Date</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {feedbacks.map(fb => (
                      <tr key={fb._id}>
                        <td>{fb.user?.name} ({fb.user?.email})</td>
                        <td>{fb.message}</td>
                        <td>{new Date(fb.date).toLocaleDateString()}</td>
                        <td>
                          <button className="btn btn-danger btn-sm" onClick={() => deleteFeedback(fb._id)}>Delete</button>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default AdminDashboard;
