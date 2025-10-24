import React from 'react';
import { Link } from 'react-router-dom';

const Home = () => {
  return (
    <div className="container mt-5">
      <div className="text-center mb-5">
        <h1 className="display-4 text-success">🍎 Welcome to Grocery Management System 🥕</h1>
        <p className="lead">Your one-stop solution for online grocery shopping</p>
      </div>
      <div className="row">
        <div className="col-md-4 mb-4">
          <div className="card h-100 product-card">
            <div className="card-body text-center">
              <h5 className="card-title">Browse Categories</h5>
              <p className="card-text">Explore our wide range of grocery categories including fruits, vegetables, dairy, and beverages.</p>
              <Link to="/categories" className="btn btn-success">Shop Now</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 product-card">
            <div className="card-body text-center">
              <h5 className="card-title">Manage Profile</h5>
              <p className="card-text">Update your personal details and keep your account information current.</p>
              <Link to="/profile" className="btn btn-success">View Profile</Link>
            </div>
          </div>
        </div>
        <div className="col-md-4 mb-4">
          <div className="card h-100 product-card">
            <div className="card-body text-center">
              <h5 className="card-title">Order History</h5>
              <p className="card-text">Review your past purchases and track your shopping history.</p>
              <Link to="/orders" className="btn btn-success">View Orders</Link>
            </div>
          </div>
        </div>
      </div>
      <div className="row">
        <div className="col-md-6 mb-4">
          <div className="card h-100 product-card">
            <div className="card-body text-center">
              <h5 className="card-title">Shopping Cart</h5>
              <p className="card-text">Add items to your cart and checkout securely.</p>
              <Link to="/cart" className="btn btn-success">Go to Cart</Link>
            </div>
          </div>
        </div>
        <div className="col-md-6 mb-4">
          <div className="card h-100 product-card">
            <div className="card-body text-center">
              <h5 className="card-title">Feedback</h5>
              <p className="card-text">Share your experience and help us improve our service.</p>
              <Link to="/feedback" className="btn btn-success">Give Feedback</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;
