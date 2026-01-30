import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './Login.css';

const Login = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: '',
    password: ''
  });
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
    // Clear error when user starts typing
    if (error) setError('');
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      // TODO: Replace with actual API call
      // Simulate API call
      await new Promise(resolve => setTimeout(resolve, 1000));

      // Mock authentication - determine role from email
      let role = 'employee';
      let userName = 'Employee User';

      if (formData.email.includes('admin')) {
        role = 'admin';
        userName = 'Admin User';
      } else if (formData.email.includes('hr')) {
        role = 'hr';
        userName = 'HR User';
      }

      // Store auth data
      localStorage.setItem('token', 'mock-jwt-token');
      localStorage.setItem('userRole', role);
      localStorage.setItem('userName', userName);

      // Navigate to dashboard
      navigate('/');
    } catch (err) {
      setError('Invalid email or password');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="login-container">
      <div className="login-card">
        <div className="login-header">
          <div className="login-logo">⚙️</div>
          <h1 className="login-title">Hardware Management</h1>
          <p className="login-subtitle">Sign in to your account</p>
        </div>

        {error && (
          <div className="alert alert-danger">
            {error}
          </div>
        )}

        <form onSubmit={handleSubmit} className="login-form">
          <div className="form-group">
            <label htmlFor="email" className="form-label">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              name="email"
              className="form-control"
              placeholder="you@company.com"
              value={formData.email}
              onChange={handleChange}
              required
              autoFocus
            />
          </div>

          <div className="form-group">
            <label htmlFor="password" className="form-label">
              Password
            </label>
            <input
              type="password"
              id="password"
              name="password"
              className="form-control"
              placeholder="Enter your password"
              value={formData.password}
              onChange={handleChange}
              required
            />
          </div>

          <div className="form-options">
            <label className="checkbox-label">
              <input type="checkbox" />
              <span>Remember me</span>
            </label>
            <a href="#" className="forgot-password">
              Forgot password?
            </a>
          </div>

          <button 
            type="submit" 
            className="btn btn-primary btn-block btn-lg"
            disabled={loading}
          >
            {loading ? 'Signing in...' : 'Sign In'}
          </button>
        </form>

        <div className="login-demo-accounts">
          <p className="demo-title">Demo Accounts:</p>
          <div className="demo-accounts-grid">
            <div className="demo-account">
              <strong>Employee:</strong> employee@company.com
            </div>
            <div className="demo-account">
              <strong>Admin:</strong> admin@company.com
            </div>
            <div className="demo-account">
              <strong>HR:</strong> hr@company.com
            </div>
          </div>
          <p className="demo-note">Password: any value (demo mode)</p>
        </div>
      </div>

      <div className="login-footer">
        <p>Hardware Management System v1.0.0</p>
        <p>© 2026 All rights reserved</p>
      </div>
    </div>
  );
};

export default Login;
