import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './Dashboard.css';

const Dashboard = () => {
  const [loading, setLoading] = useState(true);
  const [stats, setStats] = useState({
    totalAssets: 0,
    inUse: 0,
    maintenance: 0,
    available: 0
  });
  const [recentActivity, setRecentActivity] = useState([]);
  const [myAssets, setMyAssets] = useState([]);
  
  const userRole = localStorage.getItem('userRole') || 'employee';

  useEffect(() => {
    fetchDashboardData();
  }, []);

  const fetchDashboardData = async () => {
    try {
      // TODO: Replace with actual API calls
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data
      setStats({
        totalAssets: 245,
        inUse: 182,
        maintenance: 12,
        available: 51
      });

      setRecentActivity([
        {
          id: 1,
          type: 'assigned',
          message: 'Dell XPS 15 assigned to you',
          time: '2 hours ago',
          icon: '📦'
        },
        {
          id: 2,
          type: 'maintenance',
          message: 'Monitor maintenance completed',
          time: '1 day ago',
          icon: '🔧'
        },
        {
          id: 3,
          type: 'request',
          message: 'Your laptop request was approved',
          time: '3 days ago',
          icon: '✅'
        }
      ]);

      setMyAssets([
        {
          id: 1,
          name: 'MacBook Pro 16"',
          serial: 'SERIAL-12345',
          category: 'Laptop',
          status: 'Active',
          assignedDate: '15/01/2024'
        },
        {
          id: 2,
          name: 'Dell Monitor 27"',
          serial: 'MON-67890',
          category: 'Monitor',
          status: 'Maintenance',
          assignedDate: '20/03/2024'
        }
      ]);

      setLoading(false);
    } catch (error) {
      console.error('Error fetching dashboard data:', error);
      setLoading(false);
    }
  };

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading dashboard...</p>
      </div>
    );
  }

  return (
    <div className="dashboard">
      {/* Page Header */}
      <div className="page-header">
        <h1 className="page-title">Dashboard</h1>
        <p className="page-subtitle">
          Welcome back! Here's an overview of your hardware assets.
        </p>
      </div>

      {/* Quick Actions */}
      <div className="quick-actions">
        <Link to="/request" className="btn btn-primary">
          + Request New Asset
        </Link>
        <Link to="/assets" className="btn btn-secondary">
          View All Assets
        </Link>
      </div>

      {/* Stats Cards */}
      <div className="stats-grid">
        <div className="stat-card">
          <div className="stat-icon blue">📦</div>
          <div className="stat-content">
            <div className="stat-value">{stats.totalAssets}</div>
            <div className="stat-label">Total Assets</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon green">✓</div>
          <div className="stat-content">
            <div className="stat-value">{stats.inUse}</div>
            <div className="stat-label">In Use</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon orange">🔧</div>
          <div className="stat-content">
            <div className="stat-value">{stats.maintenance}</div>
            <div className="stat-label">Maintenance</div>
          </div>
        </div>

        <div className="stat-card">
          <div className="stat-icon gray">🕐</div>
          <div className="stat-content">
            <div className="stat-value">{stats.available}</div>
            <div className="stat-label">Available</div>
          </div>
        </div>
      </div>

      {/* Main Content Grid */}
      <div className="dashboard-grid">
        {/* My Assets Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">My Assets</h2>
            <Link to="/assets" className="section-link">View All →</Link>
          </div>
          
          <div className="card">
            {myAssets.length > 0 ? (
              <div className="table-container">
                <table className="table">
                  <thead>
                    <tr>
                      <th>Asset Name</th>
                      <th>Serial Number</th>
                      <th>Category</th>
                      <th>Status</th>
                      <th>Actions</th>
                    </tr>
                  </thead>
                  <tbody>
                    {myAssets.map(asset => (
                      <tr key={asset.id}>
                        <td className="font-medium">{asset.name}</td>
                        <td className="text-muted">{asset.serial}</td>
                        <td className="text-muted">{asset.category}</td>
                        <td>
                          <span className={`badge ${
                            asset.status === 'Active' ? 'badge-success' : 'badge-warning'
                          }`}>
                            {asset.status}
                          </span>
                        </td>
                        <td>
                          <Link to={`/assets/${asset.id}`} className="text-primary">
                            View
                          </Link>
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📦</div>
                <div className="empty-state-text">No assets assigned</div>
                <div className="empty-state-subtext">
                  Request an asset to get started
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Recent Activity Section */}
        <div className="dashboard-section">
          <div className="section-header">
            <h2 className="section-title">Recent Activity</h2>
          </div>
          
          <div className="card">
            {recentActivity.length > 0 ? (
              <div className="activity-list">
                {recentActivity.map(activity => (
                  <div key={activity.id} className="activity-item">
                    <div className="activity-icon">{activity.icon}</div>
                    <div className="activity-content">
                      <div className="activity-message">{activity.message}</div>
                      <div className="activity-time">{activity.time}</div>
                    </div>
                  </div>
                ))}
              </div>
            ) : (
              <div className="empty-state">
                <div className="empty-state-icon">📋</div>
                <div className="empty-state-text">No recent activity</div>
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Admin/HR Specific Sections */}
      {(userRole === 'admin' || userRole === 'hr') && (
        <div className="admin-section">
          <div className="section-header">
            <h2 className="section-title">Pending Actions</h2>
          </div>
          
          <div className="card">
            <div className="alert alert-info">
              <strong>3 pending requests</strong> waiting for approval
            </div>
            <Link to="/requests" className="btn btn-primary mt-2">
              Review Requests
            </Link>
          </div>
        </div>
      )}
    </div>
  );
};

export default Dashboard;
