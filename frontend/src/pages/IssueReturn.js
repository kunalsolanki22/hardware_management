import React from 'react';

const IssueReturn = () => {
  return (
    <div className="issue-return">
      <div className="page-header">
        <h1 className="page-title">Issue / Return Asset</h1>
        <p className="page-subtitle">
          Manage asset issuance and returns
        </p>
      </div>

      <div className="card">
        <div className="alert alert-info">
          <strong>Coming Soon!</strong> Issue/Return functionality will be implemented in the next phase.
        </div>
        
        <h3>Planned Features:</h3>
        <ul>
          <li>Issue assets to employees</li>
          <li>Process asset returns</li>
          <li>Check asset condition</li>
          <li>Update inventory automatically</li>
          <li>Generate handover documents</li>
        </ul>
      </div>
    </div>
  );
};

export default IssueReturn;
