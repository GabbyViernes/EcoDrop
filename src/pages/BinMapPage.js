import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import BinMapImage from '../assets/images/BinMapImage.png';
import '../styles/BinMapPage.css';

const BinMapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [showModal, setShowModal] = useState(false);
  const [formData, setFormData] = useState({
    binId: '',
    location: '',
    address: '',
    coordinates: '',
    capacity: '',
    type: '',
    collectionSchedule: '',
  });

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
      <div className="hill h1"></div>
      <div className="hill h2"></div>
      <div className="hill h3"></div>

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
          </div>
        </div>
      </main>

      <button className="add-ecobin-btn" onClick={() => setShowModal(true)}>
        + Add EcoBin
      </button>

      {showModal && (
        <div className="modal-overlay" onClick={handleOverlayClick}>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add New EcoBin</h3>
              <button className="modal-close-btn" type="button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <p className="modal-subtitle">Fill in the details to register a new EcoBin location.</p>

            <form className="modal-form" onSubmit={handleFormSubmit}>
              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Bin ID</label>
                  <input
                    type="text"
                    name="binId"
                    placeholder="e.g. BIN-003"
                    value={formData.binId}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>Bin Type</label>
                  <select name="type" value={formData.type} onChange={handleFormChange} required>
                    <option value="">Select type...</option>
                    <option value="Polyethylene">Polyethylene</option>
                    <option value="Polypropylene">Polypropylene</option>
                    <option value="Mixed Plastic">Mixed Plastic</option>
                  </select>
                </div>
              </div>

              <div className="modal-form-group">
                <label>Location Name</label>
                <input
                  type="text"
                  name="location"
                  placeholder="e.g. Ayala Centrio Mall"
                  value={formData.location}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="modal-form-group">
                <label>Full Address</label>
                <input
                  type="text"
                  name="address"
                  placeholder="e.g. Corrales Ave, Cagayan de Oro City"
                  value={formData.address}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="modal-form-row">
                <div className="modal-form-group">
                  <label>Coordinates</label>
                  <input
                    type="text"
                    name="coordinates"
                    placeholder="e.g. 8.4800° N, 124.6461° E"
                    value={formData.coordinates}
                    onChange={handleFormChange}
                    required
                  />
                </div>
                <div className="modal-form-group">
                  <label>Capacity (kg)</label>
                  <input
                    type="text"
                    name="capacity"
                    placeholder="e.g. 20 kg"
                    value={formData.capacity}
                    onChange={handleFormChange}
                    required
                  />
                </div>
              </div>

              <div className="modal-form-group">
                <label>Collection Schedule</label>
                <input
                  type="text"
                  name="collectionSchedule"
                  placeholder="e.g. Every Saturday 8:00 AM"
                  value={formData.collectionSchedule}
                  onChange={handleFormChange}
                  required
                />
              </div>

              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowModal(false)}>
                  Cancel
                </button>
                <button type="button" className="modal-qr-btn" onClick={() => alert('QR Code generation coming soon.')}>
                Add QR Code
                </button>
                <button type="submit" className="modal-submit-btn">
                  Add EcoBin
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinMapPage;