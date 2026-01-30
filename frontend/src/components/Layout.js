import React, { useState } from 'react';
import { Outlet, Link, useNavigate, useLocation } from 'react-router-dom';
import './Layout.css';

const Layout = () => {
  const navigate = useNavigate();
  const location = useLocation();
  const [sidebarOpen, setSidebarOpen] = useState(true);
  
  // Get user info from localStorage (mock for now)
  const userRole = localStorage.getItem('userRole') || 'employee';
  const userName = localStorage.getItem('userName') || 'User';

  const handleLogout = () => {
    localStorage.removeItem('token');
    localStorage.removeItem('userRole');
    localStorage.removeItem('userName');
    navigate('/login');
  };

  // Check if current path matches
  const isActive = (path) => {
    return location.pathname === path || location.pathname.startsWith(path + '/');
  };

  return (
    <div className="layout">
      {/* Top Navigation Bar */}
      <nav className="navbar">
        <div className="navbar-content">
          <div className="navbar-left">
            <button 
              className="sidebar-toggle"
              onClick={() => setSidebarOpen(!sidebarOpen)}
              aria-label="Toggle sidebar"
            >
              ☰
            </button>
            <Link to="/" className="navbar-brand">
              <span className="brand-icon">⚙️</span>
              <span className="brand-text">Hardware Management</span>
            </Link>
          </div>
          
          <div className="navbar-right">
            <div className="user-info">
              <span className="user-role">{userRole.toUpperCase()}</span>
              <span className="user-name">{userName}</span>
              <button onClick={handleLogout} className="btn-logout">
                Logout
              </button>
            </div>
          </div>
        </div>
      </nav>

      <div className="layout-body">
        {/* Sidebar Navigation */}
        <aside className={`sidebar ${sidebarOpen ? 'open' : 'closed'}`}>
          <nav className="sidebar-nav">
            <Link 
              to="/" 
              className={`nav-item ${isActive('/') && location.pathname === '/' ? 'active' : ''}`}
            >
              <span className="nav-icon">📊</span>
              <span className="nav-text">Dashboard</span>
            </Link>

            <Link 
              to="/assets" 
              className={`nav-item ${isActive('/assets') ? 'active' : ''}`}
            >
              <span className="nav-icon">💻</span>
              <span className="nav-text">Assets</span>
            </Link>

            <Link 
              to="/request" 
              className={`nav-item ${isActive('/request') ? 'active' : ''}`}
            >
              <span className="nav-icon">📝</span>
              <span className="nav-text">Request Asset</span>
            </Link>

            {(userRole === 'admin' || userRole === 'hr') && (
              <>
                <div className="nav-divider"></div>
                <div className="nav-section-title">Admin</div>
                
                <Link 
                  to="/issue-return" 
                  className={`nav-item ${isActive('/issue-return') ? 'active' : ''}`}
                >
                  <span className="nav-icon">🔄</span>
                  <span className="nav-text">Issue/Return</span>
                </Link>
              </>
            )}

            {userRole === 'hr' && (
              <>
                <div className="nav-divider"></div>
                <div className="nav-section-title">HR</div>
                
                <Link 
                  to="/onboarding" 
                  className={`nav-item ${isActive('/onboarding') ? 'active' : ''}`}
                >
                  <span className="nav-icon">👥</span>
                  <span className="nav-text">Onboarding</span>
                </Link>
              </>
            )}
          </nav>

          <div className="sidebar-footer">
            <div className="sidebar-footer-content">
              <span className="footer-icon">ℹ️</span>
              <span className="footer-text">Version 1.0.0</span>
            </div>
          </div>
        </aside>

        {/* Main Content Area */}
        <main className="main-content">
          <Outlet />
        </main>
      </div>
    </div>
  );
};

export default Layout;
