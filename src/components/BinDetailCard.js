import React from 'react';

const BinDetailCard = ({ details }) => {
  if (!details) return null;

  // Calculate color based on fill level
  const fillColor =
    details.fillLevel >= 80
      ? '#e74c3c'
      : details.fillLevel >= 50
      ? '#f39c12'
      : '#889063';

  return (
    <div className="bin-detail-card">
      <div className="bin-detail-header">
        <span className="bin-id">{details.id}</span>
        <span className={`bin-status-badge ${details.status.toLowerCase()}`}>
          {details.status}
        </span>
      </div>

      <p className="bin-location-name">{details.location}</p>
      <p className="bin-address">{details.address}</p>

      <div className="bin-fill-section">
        <div className="bin-fill-label">
          <span>Fill Level</span>
          <span className="bin-fill-percent" style={{ color: fillColor }}>
            {details.fillLevel}%
          </span>
        </div>
        <div className="bin-fill-bar-bg">
          <div
            className="bin-fill-bar"
            style={{ width: `${details.fillLevel}%`, backgroundColor: fillColor }}
          />
        </div>
      </div>

      <div className="bin-info-grid">
        <div className="bin-info-item">
          <span className="bin-info-label">Type</span>
          <span className="bin-info-value">{details.type}</span>
        </div>
        <div className="bin-info-item">
          <span className="bin-info-label">Capacity</span>
          <span className="bin-info-value">{details.capacity}</span>
        </div>
        <div className="bin-info-item">
          <span className="bin-info-label">Current Load</span>
          <span className="bin-info-value">{details.currentLoad}</span>
        </div>
        <div className="bin-info-item">
          <span className="bin-info-label">Coordinates</span>
          <span className="bin-info-value">{details.coordinates}</span>
        </div>
        <div className="bin-info-item">
          <span className="bin-info-label">Last Emptied</span>
          <span className="bin-info-value">{details.lastEmptied}</span>
        </div>
        <div className="bin-info-item">
          <span className="bin-info-label">Next Collection</span>
          <span className="bin-info-value">{details.nextCollection}</span>
        </div>
      </div>
    </div>
  );
};

export default BinDetailCard;