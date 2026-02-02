import './login.css';
import React, { useState } from 'react';
import API from '../../services/axios';
import { useNavigate } from 'react-router-dom';

export default function Login() {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handlelogin = async (e) => {
    e.preventDefault();
    try {
      const myData = { username, password };
      const res = await API.post('/auth/login', myData);
      localStorage.setItem('token', res.data.token);
      if (!res.data.token) return alert('Login failed');
      navigate('/admin/dashboard');
    } catch (err) {
      alert(err.response?.data?.message || 'Login failed');
    }
  };

  return (
    <div className="login-page">
      {/* Left gradient panel */}
      <div className="login-left">
        <div className="login-left-content">
          <h1>Welcome Back</h1>
          <p>
            Manage your billing, invoices, and payments with a clean and modern
            dashboard.
          </p>
        </div>
      </div>

      {/* Right form panel */}
      <div className="login-right">
        <form className="login-card" onSubmit={handlelogin}>
          <h2 className="login-title">Sign In</h2>
          <p className="login-subtitle">Enter your credentials</p>

          <div className="input-group">
            <label>Username</label>
            <input
              type="text"
              placeholder="Enter username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>

          <div className="input-group">
            <label>Password</label>
            <input
              type="password"
              placeholder="Enter password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>

          <button type="submit" className="login-btn">
            Login
          </button>
        </form>
      </div>
    </div>
  );
}
