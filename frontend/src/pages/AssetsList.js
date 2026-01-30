import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import './AssetsList.css';

const AssetsList = () => {
  const [loading, setLoading] = useState(true);
  const [assets, setAssets] = useState([]);
  const [filteredAssets, setFilteredAssets] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [categoryFilter, setCategoryFilter] = useState('all');
  const [statusFilter, setStatusFilter] = useState('all');
  const [currentPage, setCurrentPage] = useState(1);
  const itemsPerPage = 10;

  useEffect(() => {
    fetchAssets();
  }, []);

  useEffect(() => {
    filterAssets();
  }, [searchTerm, categoryFilter, statusFilter, assets]);

  const fetchAssets = async () => {
    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 800));

      // Mock data
      const mockAssets = [
        {
          id: 1,
          assetId: 'HW-001',
          name: 'MacBook Pro 16"',
          serialNumber: 'SERIAL-12345',
          category: 'Laptop',
          status: 'Assigned',
          assignedTo: 'John Doe',
          purchaseDate: '15/01/2024'
        },
        {
          id: 2,
          assetId: 'HW-002',
          name: 'Dell Monitor 27"',
          serialNumber: 'MON-67890',
          category: 'Monitor',
          status: 'Available',
          assignedTo: '—',
          purchaseDate: '20/03/2024'
        },
        {
          id: 3,
          assetId: 'HW-003',
          name: 'Logitech Mouse',
          serialNumber: 'MOUSE-456',
          category: 'Peripheral',
          status: 'Maintenance',
          assignedTo: 'Jane Smith',
          purchaseDate: '10/02/2024'
        },
        {
          id: 4,
          assetId: 'HW-004',
          name: 'HP EliteBook 840',
          serialNumber: 'HP-840-789',
          category: 'Laptop',
          status: 'Available',
          assignedTo: '—',
          purchaseDate: '05/04/2024'
        },
        {
          id: 5,
          assetId: 'HW-005',
          name: 'Dell Keyboard',
          serialNumber: 'KB-123',
          category: 'Peripheral',
          status: 'Assigned',
          assignedTo: 'Mike Johnson',
          purchaseDate: '12/03/2024'
        }
      ];

      setAssets(mockAssets);
      setFilteredAssets(mockAssets);
      setLoading(false);
    } catch (error) {
      console.error('Error fetching assets:', error);
      setLoading(false);
    }
  };

  const filterAssets = () => {
    let filtered = [...assets];

    // Search filter
    if (searchTerm) {
      filtered = filtered.filter(asset =>
        asset.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.assetId.toLowerCase().includes(searchTerm.toLowerCase()) ||
        asset.serialNumber.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Category filter
    if (categoryFilter !== 'all') {
      filtered = filtered.filter(asset => asset.category === categoryFilter);
    }

    // Status filter
    if (statusFilter !== 'all') {
      filtered = filtered.filter(asset => asset.status === statusFilter);
    }

    setFilteredAssets(filtered);
    setCurrentPage(1); // Reset to first page when filtering
  };

  const getStatusBadgeClass = (status) => {
    switch (status) {
      case 'Available':
        return 'badge-primary';
      case 'Assigned':
        return 'badge-success';
      case 'Maintenance':
        return 'badge-warning';
      case 'Retired':
        return 'badge-secondary';
      default:
        return 'badge-secondary';
    }
  };

  // Pagination
  const indexOfLastItem = currentPage * itemsPerPage;
  const indexOfFirstItem = indexOfLastItem - itemsPerPage;
  const currentAssets = filteredAssets.slice(indexOfFirstItem, indexOfLastItem);
  const totalPages = Math.ceil(filteredAssets.length / itemsPerPage);

  if (loading) {
    return (
      <div className="loading">
        <div className="spinner"></div>
        <p>Loading assets...</p>
      </div>
    );
  }

  return (
    <div className="assets-list">
      {/* Page Header */}
      <div className="page-header">
        <div>
          <h1 className="page-title">Assets</h1>
          <p className="page-subtitle">
            Manage and track all hardware assets
          </p>
        </div>
        <Link to="/request" className="btn btn-primary">
          + Request Asset
        </Link>
      </div>

      {/* Filters */}
      <div className="card filters-card">
        <div className="filters-grid">
          {/* Search */}
          <div className="filter-group">
            <input
              type="text"
              className="form-control"
              placeholder="🔍 Search by name, ID, or serial..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
            />
          </div>

          {/* Category Filter */}
          <div className="filter-group">
            <select
              className="form-control"
              value={categoryFilter}
              onChange={(e) => setCategoryFilter(e.target.value)}
            >
              <option value="all">All Categories</option>
              <option value="Laptop">Laptop</option>
              <option value="Monitor">Monitor</option>
              <option value="Peripheral">Peripheral</option>
              <option value="Desktop">Desktop</option>
            </select>
          </div>

          {/* Status Filter */}
          <div className="filter-group">
            <select
              className="form-control"
              value={statusFilter}
              onChange={(e) => setStatusFilter(e.target.value)}
            >
              <option value="all">All Status</option>
              <option value="Available">Available</option>
              <option value="Assigned">Assigned</option>
              <option value="Maintenance">Maintenance</option>
              <option value="Retired">Retired</option>
            </select>
          </div>
        </div>

        <div className="filter-summary">
          Showing {currentAssets.length} of {filteredAssets.length} assets
        </div>
      </div>

      {/* Assets Table */}
      <div className="card">
        {filteredAssets.length > 0 ? (
          <>
            <div className="table-container">
              <table className="table">
                <thead>
                  <tr>
                    <th>Asset ID</th>
                    <th>Name</th>
                    <th>Serial Number</th>
                    <th>Category</th>
                    <th>Status</th>
                    <th>Assigned To</th>
                    <th>Purchase Date</th>
                    <th>Actions</th>
                  </tr>
                </thead>
                <tbody>
                  {currentAssets.map(asset => (
                    <tr key={asset.id}>
                      <td className="font-medium">{asset.assetId}</td>
                      <td className="font-medium">{asset.name}</td>
                      <td className="text-muted">{asset.serialNumber}</td>
                      <td>{asset.category}</td>
                      <td>
                        <span className={`badge ${getStatusBadgeClass(asset.status)}`}>
                          {asset.status}
                        </span>
                      </td>
                      <td>{asset.assignedTo}</td>
                      <td className="text-muted">{asset.purchaseDate}</td>
                      <td>
                        <Link to={`/assets/${asset.id}`} className="action-link">
                          View
                        </Link>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>

            {/* Pagination */}
            {totalPages > 1 && (
              <div className="pagination">
                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setCurrentPage(prev => Math.max(prev - 1, 1))}
                  disabled={currentPage === 1}
                >
                  ← Previous
                </button>

                <div className="pagination-info">
                  Page {currentPage} of {totalPages}
                </div>

                <button
                  className="btn btn-sm btn-secondary"
                  onClick={() => setCurrentPage(prev => Math.min(prev + 1, totalPages))}
                  disabled={currentPage === totalPages}
                >
                  Next →
                </button>
              </div>
            )}
          </>
        ) : (
          <div className="empty-state">
            <div className="empty-state-icon">🔍</div>
            <div className="empty-state-text">No assets found</div>
            <div className="empty-state-subtext">
              Try adjusting your search or filters
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default AssetsList;
