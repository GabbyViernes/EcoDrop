import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import BinMapImage from '../assets/images/BinMapImage.png';
import '../styles/BinMapPage.css';

const BinMapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);

  // ✅ Fill level state
  const [fillLevel, setFillLevel] = useState(85);

  const [formData, setFormData] = useState({
    binId: '',
    location: '',
    address: '',
    coordinates: '',
    capacity: '',
    type: '',
    collectionSchedule: '',
  });

  // ✅ Bin details now uses fillLevel state
  const binDetails = {
    id: 'BIN-001',
    location: 'Limketkai Center',
    address: 'Limketkai Dr, Cagayan de Oro, 9000 Misamis Oriental',
    status: fillLevel >= 80 ? 'Critical' : fillLevel >= 50 ? 'Warning' : 'Normal',
    fillLevel: fillLevel,
    lastEmptied: '2026-02-01 08:00 AM',
    nextCollection: '2026-02-15 08:00 AM',
    capacity: '20 kg',
    currentLoad: `${(fillLevel / 100) * 20} kg`, // auto-calculated load
    type: 'Polyethylene',
    coordinates: '8.4822° N, 124.6472° E',
  };

  const fillColor =
    fillLevel >= 80 ? '#e74c3c' : fillLevel >= 50 ? '#f39c12' : '#4caf50';

  // ✅ Simulate deposit (increase fill level)
  function handleSimulateDeposit() {
    setFillLevel((prev) => Math.min(prev + 5, 100));
  }

  // ✅ Simulate empty (reset fill level)
  function handleSimulateEmpty() {
    setFillLevel(0);
  }

  function handleFormChange(e) {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  }

  function handleFormSubmit(e) {
    e.preventDefault();
    alert(`EcoBin "${formData.binId}" at "${formData.location}" has been added!`);
    setShowModal(false);
    setFormData({
      binId: '',
      location: '',
      address: '',
      coordinates: '',
      capacity: '',
      type: '',
      collectionSchedule: '',
    });
  }

  function handleOverlayClick(e) {
    if (e.target.classList.contains('modal-overlay')) {
      setShowModal(false);
    }
  }

  return (
    <div className="binmap-page-shell">
      <NavigationBar />

      <main className="binmap-main">
        <header className="binmap-header">
          <div className="binmap-search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search bins by location or ID..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <h2 className="binmap-title">Bin Locator Map</h2>
        </header>

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

            {/* ✅ Simulation buttons */}
            <div className="bin-actions">
              <button className="simulate-btn" onClick={handleSimulateDeposit}>
                Simulate Deposit
              </button>
              <button className="simulate-btn" onClick={handleSimulateEmpty}>
                Simulate Empty
              </button>
            </div>
          </div>
        </div>
      </main>

      <button className="add-ecobin-btn" onClick={() => setShowModal(true)}>
        + Add EcoBin
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          {/* Modal form unchanged */}
        </div>
      )}
    </div>
  );
};

export default BinMapPage;
