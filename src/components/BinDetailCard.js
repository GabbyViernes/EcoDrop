import React, { useState, useMemo } from 'react';
import '../styles/BinDetailCard.css';

const MAX_CAPACITY = 20;

const BinDetailCard = ({ details = {} }) => {
  const initialFill = details.fillLevel ?? 0;
  const [fillLevel, setFillLevel] = useState(initialFill);

  const status = useMemo(() => {
    if (fillLevel >= 80) return 'Critical';
    if (fillLevel >= 50) return 'Warning';
    return 'Normal';
  }, [fillLevel]);

  const fillColor = useMemo(() => {
    if (fillLevel >= 80) return '#e74c3c';
    if (fillLevel >= 50) return '#f39c12';
    return '#4caf50';
  }, [fillLevel]);

  const currentLoad = useMemo(() => {
    return `${((fillLevel / 100) * MAX_CAPACITY).toFixed(1)} kg`;
  }, [fillLevel]);

  function handleSimulateDeposit() {
    setFillLevel(prev => Math.min(prev + 5, 100));
  }

  function handleSimulateEmpty() {
    setFillLevel(0);
  }

  return (
    <div className="bin-detail-card">
      <div className="bin-detail-header">
        <span className="bin-id">{details.id || 'N/A'}</span>
        <span className={`bin-status-badge ${status.toLowerCase()}`}>
          {status}
        </span>
      </div>

      <p className="bin-location-name">{details.location || 'Unknown location'}</p>

      <div className="bin-fill-section">
        <div className="bin-fill-label">
          <span>Fill Level</span>
          <span className="bin-fill-percent" style={{ color: fillColor }}>
            {fillLevel}%
          </span>
        </div>

        <div className="bin-fill-bar-bg">
          <div
            className="bin-fill-bar"
            style={{
              width: `${fillLevel}%`,
              backgroundColor: fillColor,
              transition: 'width 0.3s ease-in-out'
            }}
          />
        </div>
      </div>

      <div className="bin-info-grid">
        <div className="bin-info-item">
          <span className="bin-info-label">Capacity</span>
          <span className="bin-info-value">{MAX_CAPACITY} kg</span>
        </div>

        <div className="bin-info-item">
          <span className="bin-info-label">Current Load</span>
          <span className="bin-info-value">{currentLoad}</span>
        </div>
      </div>

      <div className="bin-actions">
        <button
          className="simulate-btn deposit"
          onClick={handleSimulateDeposit}
          disabled={fillLevel >= 100}
        >
          ♻ Simulate Deposit
        </button>

        <button
          className="simulate-btn empty"
          onClick={handleSimulateEmpty}
          disabled={fillLevel === 0}
        >
          🗑 Simulate Empty
        </button>
      </div>
    </div>
  );
};

export default BinDetailCard;