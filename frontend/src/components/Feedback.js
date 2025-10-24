import React, { useState } from 'react';
import axios from 'axios';

const Feedback = () => {
  const [message, setMessage] = useState('');
  const [rating, setRating] = useState(5);

  const handleSubmit = async (e) => {
    e.preventDefault();
    const token = localStorage.getItem('token');
    if (!token) {
      alert('Please login to submit feedback');
      return;
    }
    try {
      await axios.post('http://localhost:5000/api/feedback', { message, rating }, { headers: { Authorization: `Bearer ${token}` } });
      alert('Feedback submitted successfully');
      setMessage('');
      setRating(5);
    } catch (err) {
      alert('Submission failed');
    }
  };

  return (
    <div className="container mt-5">
      <h2 className="text-success">Share Your Feedback</h2>
      <form onSubmit={handleSubmit} className="card p-4">
        <div className="mb-3">
          <label className="form-label">Rating (1-5)</label>
          <select className="form-select" value={rating} onChange={(e) => setRating(e.target.value)}>
            <option value={1}>1 - Poor</option>
            <option value={2}>2 - Fair</option>
            <option value={3}>3 - Good</option>
            <option value={4}>4 - Very Good</option>
            <option value={5}>5 - Excellent</option>
          </select>
        </div>
        <div className="mb-3">
          <label className="form-label">Your Message</label>
          <textarea className="form-control" rows="4" value={message} onChange={(e) => setMessage(e.target.value)} placeholder="Tell us about your experience..." required />
        </div>
        <button type="submit" className="btn btn-primary">Submit Feedback</button>
      </form>
    </div>
  );
};

export default Feedback;
