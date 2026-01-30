import React from 'react';
import { useParams } from 'react-router-dom';

const MaintenanceLog = () => {
  const { id } = useParams();

  return (
    <div className="maintenance-log">
      <div className="page-header">
        <h1 className="page-title">Maintenance Log</h1>
        <p className="page-subtitle">
          Log and track maintenance for Asset ID: {id}
        </p>
      </div>

      <div className="card">
        <div className="alert alert-info">
          <strong>Coming Soon!</strong> Maintenance logging will be implemented in the next phase.
        </div>
        
        <h3>Planned Features:</h3>
        <ul>
          <li>Log new maintenance activity</li>
          <li>View maintenance history</li>
          <li>Track vendor and costs</li>
          <li>Set maintenance status</li>
          <li>Add notes and attachments</li>
        </ul>
      </div>
    </div>
  );
};

export default MaintenanceLog;
