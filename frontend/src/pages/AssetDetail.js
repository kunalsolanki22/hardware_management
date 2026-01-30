import React from 'react';
import { useParams, Link } from 'react-router-dom';

const AssetDetail = () => {
  const { id } = useParams();

  return (
    <div className="asset-detail">
      <div className="page-header">
        <div>
          <Link to="/assets" className="btn btn-secondary btn-sm mb-2">
            ← Back to Assets
          </Link>
          <h1 className="page-title">Asset Details</h1>
          <p className="page-subtitle">
            Viewing details for Asset ID: {id}
          </p>
        </div>
      </div>

      <div className="card">
        <div className="alert alert-info">
          <strong>Coming Soon!</strong> Asset detail view will be implemented in the next phase.
        </div>
        
        <h3>Planned Features:</h3>
        <ul>
          <li>Complete asset information</li>
          <li>Assignment history</li>
          <li>Maintenance logs</li>
          <li>Report issue button</li>
          <li>Download QR code</li>
        </ul>
      </div>
    </div>
  );
};

export default AssetDetail;
