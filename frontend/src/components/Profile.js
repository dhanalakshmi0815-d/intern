import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Profile = () => {
  const [user, setUser] = useState({});
  const [editing, setEditing] = useState(false);
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [contact, setContact] = useState('');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const token = localStorage.getItem('token');
    axios.get('http://localhost:5000/api/profile', { headers: { Authorization: `Bearer ${token}` } })
      .then(res => {
        setUser(res.data);
        setName(res.data.name);
        setEmail(res.data.email);
        setContact(res.data.contact);
        setLoading(false);
      })
      .catch(err => {
        console.error(err);
        setLoading(false);
      });
  }, []);

  const handleUpdate = async () => {
    const token = localStorage.getItem('token');
    try {
      const res = await axios.put('http://localhost:5000/api/profile', { name, email, contact }, { headers: { Authorization: `Bearer ${token}` } });
      setUser(res.data);
      setEditing(false);
      alert('Profile updated successfully');
    } catch (err) {
      alert('Update failed');
    }
  };

  if (loading) return <div className="container mt-5"><p>Loading...</p></div>;

  return (
    <div className="container mt-5">
      <h2 className="text-success">Your Profile</h2>
      {editing ? (
        <div className="card p-4">
          <div className="mb-3">
            <label className="form-label">Name</label>
            <input type="text" className="form-control" value={name} onChange={(e) => setName(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Email</label>
            <input type="email" className="form-control" value={email} onChange={(e) => setEmail(e.target.value)} />
          </div>
          <div className="mb-3">
            <label className="form-label">Contact</label>
            <input type="text" className="form-control" value={contact} onChange={(e) => setContact(e.target.value)} />
          </div>
          <button className="btn btn-success me-2" onClick={handleUpdate}>Save</button>
          <button className="btn btn-secondary" onClick={() => setEditing(false)}>Cancel</button>
        </div>
      ) : (
        <div className="card p-4">
          <p><strong>Name:</strong> {user.name}</p>
          <p><strong>Email:</strong> {user.email}</p>
          <p><strong>Contact:</strong> {user.contact}</p>
          <button className="btn btn-primary" onClick={() => setEditing(true)}>Edit Profile</button>
        </div>
      )}
    </div>
  );
};

export default Profile;
