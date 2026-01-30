import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';


import Login from './pages/Login';
import Dashboard from './pages/Dashboard';
import AssetsList from './pages/AssetsList';
import RequestForm from './pages/RequestForm';
import AssetDetail from './pages/AssetDetail';
import MaintenanceLog from './pages/MaintenanceLog';
import IssueReturn from './pages/IssueReturn';


import Layout from './components/Layout';
import PrivateRoute from './components/PrivateRoute';

function App() {
  return (
    <Router>
      <Routes>
        {/* Public Route */}
        <Route path="/login" element={<Login />} />

        {/* Protected Routes with Layout */}
        <Route
          path="/"
          element={
            <PrivateRoute>
              <Layout />
            </PrivateRoute>
          }
        >
          {/* Dashboard - Default Route */}
          <Route index element={<Dashboard />} />
          
          {/* Asset Management Routes */}
          <Route path="assets" element={<AssetsList />} />
          <Route path="assets/:id" element={<AssetDetail />} />
          
          {/* Request Routes */}
          <Route path="request" element={<RequestForm />} />
          
          {/* Maintenance Routes */}
          <Route path="maintenance/:id" element={<MaintenanceLog />} />
          
          {/* Issue/Return Routes */}
          <Route path="issue-return" element={<IssueReturn />} />
          
          {/* Redirect unknown routes to dashboard */}
          <Route path="*" element={<Navigate to="/" replace />} />
        </Route>
      </Routes>
    </Router>
  );
}

export default App;
