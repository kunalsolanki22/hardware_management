import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './RequestForm.css';

const RequestForm = () => {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    category: '',
    reason: '',
    priority: 'normal',
    employeeName: '',
    joiningDate: ''
  });
  const [errors, setErrors] = useState({});
  
  const userRole = localStorage.getItem('userRole') || 'employee';
  const isHR = userRole === 'hr';

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: value
    }));
    
    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: ''
      }));
    }
  };

  const validateForm = () => {
    const newErrors = {};

    if (!formData.category) {
      newErrors.category = 'Please select a category';
    }

    if (!formData.reason || formData.reason.trim().length < 10) {
      newErrors.reason = 'Please provide a detailed reason (at least 10 characters)';
    }

    if (isHR && !formData.employeeName) {
      newErrors.employeeName = 'Employee name is required';
    }

    if (isHR && !formData.joiningDate) {
      newErrors.joiningDate = 'Joining date is required';
    }

    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!validateForm()) {
      return;
    }

    setLoading(true);

    try {
      // TODO: Replace with actual API call
      await new Promise(resolve => setTimeout(resolve, 1500));

      // Show success message
      alert('Request submitted successfully!');
      
      // Navigate to dashboard
      navigate('/');
    } catch (error) {
      console.error('Error submitting request:', error);
      alert('Failed to submit request. Please try again.');
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="request-form-page">
      <div className="page-header">
        <h1 className="page-title">Request New Asset</h1>
        <p className="page-subtitle">
          {isHR 
            ? 'Request hardware for a new employee' 
            : 'Fill out the form below to request a new hardware asset'
          }
        </p>
      </div>

      <div className="form-container">
        <form onSubmit={handleSubmit} className="request-form">
          <div className="card">
            <h2 className="card-header">Asset Request Details</h2>

            {/* Category */}
            <div className="form-group">
              <label htmlFor="category" className="form-label required">
                Asset Category
              </label>
              <select
                id="category"
                name="category"
                className={`form-control ${errors.category ? 'error' : ''}`}
                value={formData.category}
                onChange={handleChange}
                required
              >
                <option value="">Select Category</option>
                <option value="Laptop">Laptop</option>
                <option value="Desktop">Desktop</option>
                <option value="Monitor">Monitor</option>
                <option value="Keyboard">Keyboard</option>
                <option value="Mouse">Mouse</option>
                <option value="Headset">Headset</option>
                <option value="Other">Other</option>
              </select>
              {errors.category && (
                <span className="form-error">{errors.category}</span>
              )}
              <span className="form-help">
                Select the type of hardware you need
              </span>
            </div>

            {/* Reason */}
            <div className="form-group">
              <label htmlFor="reason" className="form-label required">
                Reason for Request
              </label>
              <textarea
                id="reason"
                name="reason"
                className={`form-control ${errors.reason ? 'error' : ''}`}
                value={formData.reason}
                onChange={handleChange}
                rows="4"
                placeholder="Describe why you need this asset..."
                required
              />
              {errors.reason && (
                <span className="form-error">{errors.reason}</span>
              )}
              <span className="form-help">
                Example: "Old laptop is slow and cannot run required software"
              </span>
            </div>

            {/* Priority */}
            <div className="form-group">
              <label htmlFor="priority" className="form-label">
                Priority
              </label>
              <select
                id="priority"
                name="priority"
                className="form-control"
                value={formData.priority}
                onChange={handleChange}
              >
                <option value="low">Low - Can wait</option>
                <option value="normal">Normal - Standard request</option>
                <option value="high">High - Urgent</option>
              </select>
            </div>
          </div>

          {/* HR-Specific Section */}
          {isHR && (
            <div className="card hr-section">
              <h2 className="card-header">
                <span className="badge badge-warning">HR Only</span> New Hire Information
              </h2>

              <div className="form-row">
                <div className="form-group">
                  <label htmlFor="employeeName" className="form-label required">
                    Employee Name
                  </label>
                  <input
                    type="text"
                    id="employeeName"
                    name="employeeName"
                    className={`form-control ${errors.employeeName ? 'error' : ''}`}
                    value={formData.employeeName}
                    onChange={handleChange}
                    placeholder="John Doe"
                  />
                  {errors.employeeName && (
                    <span className="form-error">{errors.employeeName}</span>
                  )}
                </div>

                <div className="form-group">
                  <label htmlFor="joiningDate" className="form-label required">
                    Joining Date
                  </label>
                  <input
                    type="date"
                    id="joiningDate"
                    name="joiningDate"
                    className={`form-control ${errors.joiningDate ? 'error' : ''}`}
                    value={formData.joiningDate}
                    onChange={handleChange}
                  />
                  {errors.joiningDate && (
                    <span className="form-error">{errors.joiningDate}</span>
                  )}
                </div>
              </div>

              <div className="alert alert-info">
                This request will be reviewed by admin before the employee's joining date.
              </div>
            </div>
          )}

          {/* Action Buttons */}
          <div className="form-actions">
            <button
              type="button"
              className="btn btn-secondary"
              onClick={() => navigate(-1)}
              disabled={loading}
            >
              Cancel
            </button>
            <button
              type="submit"
              className="btn btn-primary"
              disabled={loading}
            >
              {loading ? 'Submitting...' : 'Submit Request'}
            </button>
          </div>
        </form>

        {/* Info Sidebar */}
        <div className="info-sidebar">
          <div className="card">
            <h3 className="info-title">📝 How it works</h3>
            <ol className="info-list">
              <li>Fill out the request form</li>
              <li>Submit for admin approval</li>
              <li>Admin reviews and assigns asset</li>
              <li>You receive notification</li>
            </ol>
          </div>

          <div className="card">
            <h3 className="info-title">⏱️ Processing Time</h3>
            <p className="info-text">
              Most requests are processed within 2-3 business days. Urgent requests are prioritized.
            </p>
          </div>

          <div className="card">
            <h3 className="info-title">💡 Tips</h3>
            <ul className="info-list">
              <li>Be specific about your requirements</li>
              <li>Mention if replacing old equipment</li>
              <li>Indicate urgency accurately</li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RequestForm;
