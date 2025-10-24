import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useParams, useNavigate } from 'react-router-dom';

const Products = () => {
  const { categoryId } = useParams();
  const [products, setProducts] = useState([]);
  const [categoryName, setCategoryName] = useState('');
  const [searchQuery, setSearchQuery] = useState('');
  const [filteredProducts, setFilteredProducts] = useState([]);
  const navigate = useNavigate();

  const [categoryIcon, setCategoryIcon] = useState('');

  useEffect(() => {
    axios.get(`http://localhost:5000/api/categories/${categoryId}/products`)
      .then(res => {
        setProducts(res.data);
        setFilteredProducts(res.data);
      })
      .catch(err => console.error(err));

    axios.get(`http://localhost:5000/api/categories/${categoryId}`)
      .then(res => {
        setCategoryName(res.data.name);
        setCategoryIcon(res.data.icon);
      })
      .catch(err => console.error(err));
  }, [categoryId]);

  useEffect(() => {
    if (searchQuery.trim() === '') {
      setFilteredProducts(products);
    } else {
      const filtered = products.filter(prod =>
        prod.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
        prod.description.toLowerCase().includes(searchQuery.toLowerCase())
      );
      setFilteredProducts(filtered);
    }
  }, [searchQuery, products]);

  const addToCart = async (productId) => {
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to add to cart');
      navigate('/login');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/cart', { productId, quantity: 1 }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Added to cart');
    } catch (err) {
      alert('Failed to add to cart');
    }
  };

  return (
    <div className="container mt-5">
      <h2>Products in {categoryName} {categoryIcon && <span style={{ fontSize: '1.5rem' }}>{categoryIcon}</span>}</h2>
      <div className="mb-3">
        <input
          type="text"
          className="form-control"
          placeholder="Search products by name or description..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
        />
      </div>
      <div className="row">
        {filteredProducts.map(prod => (
          <div key={prod._id} className="col-md-4 mb-4">
            <div className="card h-100 product-card">
              <div className="card-body d-flex flex-column">
                <h5 className="card-title">{prod.name}</h5>
                <p className="card-text">{prod.description}</p>
                <p className="card-text fw-bold text-success">${prod.price.toFixed(2)}</p>
                <button className="btn btn-success mt-auto" onClick={() => addToCart(prod._id)}>Add to Cart</button>
              </div>
            </div>
          </div>
        ))}
      </div>
      {filteredProducts.length === 0 && searchQuery && <p>No products match your search.</p>}
      {products.length === 0 && !searchQuery && <p>No products available in this category.</p>}
    </div>
  );
};

export default Products;
