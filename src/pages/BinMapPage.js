import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import BinMapImage from '../assets/images/BinMapImage.png';
import { useAddBinForm } from '../hooks/useAddBinForm'; // Import the hook!
import '../styles/BinMapPage.css';

const BinMapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  
  // Grab all our state and logic from our custom hook
  const {
    bins,
    showModal,
    setShowModal,
    formData,
    handleFormChange,
    handleFormSubmit
  } = useAddBinForm();

  // Filter the bins pulled from the hook
  const filteredBins = bins.filter((bin) => 
    bin.id.toLowerCase().includes(searchQuery.toLowerCase()) || 
    bin.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

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

          <div className="bin-cards-container">
            {filteredBins.length > 0 ? (
              filteredBins.map((bin) => {
                const fillColor = bin.fillLevel >= 80 ? '#e74c3c' : bin.fillLevel >= 50 ? '#f39c12' : '#889063';

                return (
                  <div className="bin-detail-card" key={bin.id}>
                    <div className="bin-detail-header">
                      <span className="bin-id">{bin.id}</span>
                      <span className={`bin-status-badge ${bin.status.toLowerCase()}`}>
                        {bin.status}
                      </span>
                    </div>

                    <p className="bin-location-name">{bin.location}</p>
                    <p className="bin-address">{bin.address}</p>

                    <div className="bin-fill-section">
                      <div className="bin-fill-label">
                        <span>Fill Level</span>
                        <span className="bin-fill-percent" style={{ color: fillColor }}>
                          {bin.fillLevel}%
                        </span>
                      </div>
                      <div className="bin-fill-bar-bg">
                        <div
                          className="bin-fill-bar"
                          style={{ width: `${bin.fillLevel}%`, backgroundColor: fillColor }}
                        />
                      </div>
                    </div>

                    <div className="bin-info-grid">
                      <div className="bin-info-item">
                        <span className="bin-info-label">Type</span>
                        <span className="bin-info-value">{bin.type}</span>
                      </div>
                      <div className="bin-info-item">
                        <span className="bin-info-label">Capacity</span>
                        <span className="bin-info-value">{bin.capacity}</span>
                      </div>
                      <div className="bin-info-item">
                        <span className="bin-info-label">Current Load</span>
                        <span className="bin-info-value">{bin.currentLoad}</span>
                      </div>
                      <div className="bin-info-item">
                        <span className="bin-info-label">Coordinates</span>
                        <span className="bin-info-value">{bin.coordinates}</span>
                      </div>
                      <div className="bin-info-item">
                        <span className="bin-info-label">Last Emptied</span>
                        <span className="bin-info-value">{bin.lastEmptied}</span>
                      </div>
                      <div className="bin-info-item">
                        <span className="bin-info-label">Next Collection</span>
                        <span className="bin-info-value">{bin.nextCollection}</span>
                      </div>
                    </div>
                  </div>
                );
              })
            ) : (
              <p style={{ textAlign: 'center', color: '#4C3D19', fontWeight: 'bold' }}>No bins found matching your search.</p>
            )}
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