import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const Categories = () => {
  const [categories, setCategories] = useState([]);

  useEffect(() => {
    axios.get('http://localhost:5000/api/categories')
      .then(res => setCategories(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="container mt-5">
      <h2>Grocery Categories</h2>
      <div className="row">
        {categories.map(cat => (
          <div key={cat._id} className="col-md-4 mb-4">
            <div className="card h-100 product-card">
              <div className="card-body d-flex flex-column text-center">
                <div className="mb-3 category-icon">{cat.icon}</div>
                <h5 className="card-title">{cat.name}</h5>
                <p className="card-text">{cat.description}</p>
                <Link to={`/products/${cat._id}`} className="btn btn-success mt-auto">Browse Products</Link>
              </div>
            </div>
          </div>
        ))}
      </div>
      {categories.length === 0 && <p>Loading categories...</p>}
    </div>
  );
};

export default Categories;
