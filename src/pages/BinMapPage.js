import React, { useState } from 'react';
import Navbar from '../components/NavigationBar';
import BinMapImage from '../assets/images/BinMapImage.png';
import '../styles/BinMapPage.css';

const BinMapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const binDetails = {
    id: 'BIN-001',
    location: 'Limketkai Center',
    address: 'Limketkai Dr, Cagayan de Oro, 9000 Misamis Oriental',
    status: 'Critical',
    fillLevel: 85,
    lastEmptied: '2026-02-01 08:00 AM',
    nextCollection: '2026-02-15 08:00 AM',
    capacity: '20 kg',
    currentLoad: '17 kg',
    type: 'Polyethylene',
    coordinates: '8.4822° N, 124.6472° E',
  };

  const fillColor =
    binDetails.fillLevel >= 80
      ? '#e74c3c'
      : binDetails.fillLevel >= 50
      ? '#f39c12'
      : '#889063';

  return (
    <div className="binmap-page-shell">
      <Navbar />

      <main className="binmap-main">
        <header className="binmap-header">
          <div className="search-bar">
            <input
              type="text"
              placeholder="Search bins by location or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
        </header>

        <h2 className="binmap-title">Bin Locator Map</h2>

        <div className="binmap-content">
          <div className="map-wrapper">
            <img src={BinMapImage} alt="Bin Map" className="binmap-image" />
          </div>

          <div className="bin-detail-card">
            <div className="bin-detail-header">
              <span className="bin-id">{binDetails.id}</span>
              <span className={`bin-status-badge ${binDetails.status.toLowerCase()}`}>
                {binDetails.status}
              </span>
            </div>

            <p className="bin-location-name">{binDetails.location}</p>
            <p className="bin-address">{binDetails.address}</p>

            <div className="bin-fill-section">
              <div className="bin-fill-label">
                <span>Fill Level</span>
                <span className="bin-fill-percent" style={{ color: fillColor }}>
                  {binDetails.fillLevel}%
                </span>
              </div>
              <div className="bin-fill-bar-bg">
                <div
                  className="bin-fill-bar"
                  style={{ width: `${binDetails.fillLevel}%`, backgroundColor: fillColor }}
                />
              </div>
            </div>

            <div className="bin-info-grid">
              <div className="bin-info-item">
                <span className="bin-info-label">Type</span>
                <span className="bin-info-value">{binDetails.type}</span>
              </div>
              <div className="bin-info-item">
                <span className="bin-info-label">Capacity</span>
                <span className="bin-info-value">{binDetails.capacity}</span>
              </div>
              <div className="bin-info-item">
                <span className="bin-info-label">Current Load</span>
                <span className="bin-info-value">{binDetails.currentLoad}</span>
              </div>
              <div className="bin-info-item">
                <span className="bin-info-label">Coordinates</span>
                <span className="bin-info-value">{binDetails.coordinates}</span>
              </div>
              <div className="bin-info-item">
                <span className="bin-info-label">Last Emptied</span>
                <span className="bin-info-value">{binDetails.lastEmptied}</span>
              </div>
              <div className="bin-info-item">
                <span className="bin-info-label">Next Collection</span>
                <span className="bin-info-value">{binDetails.nextCollection}</span>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

export default BinMapPage;