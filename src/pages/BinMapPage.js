import React from 'react';
import NavigationBar from '../components/NavigationBar';
import BinDetailCard from '../components/BinDetailCard'; // New extracted component
import AddBinModal from '../components/AddBinModal'; // New extracted component
import BinMapImage from '../assets/images/BinMapImage.png';
import { useAddBinForm } from '../hooks/useAddBinForm';
import '../styles/BinMapPage.css';

const INITIAL_FORM_STATE = {
  binId: '', location: '', address: '', coordinates: '',
  capacity: '', type: '', collectionSchedule: '',
};

const BinMapPage = () => {
  // Logic extracted to hook
  const { showModal, toggleModal, formData, handleFormChange, handleFormSubmit } = useAddBinForm(INITIAL_FORM_STATE);

  // Mock data (ideally fetched via API later)
  const binDetails = {
    id: 'BIN-001', location: 'Limketkai Center', fillLevel: 85, status: 'Critical', /* ...other props */
  };

  return (
    <div className="binmap-page-shell">
      <div className="hill h1"></div><div className="hill h2"></div><div className="hill h3"></div>
      <NavigationBar />

      <main className="binmap-main">
        <header className="binmap-header">
          {/* Add a generic SearchBar component here in the future */}
          <h2 className="binmap-title">Bin Locator Map</h2>
        </header>

        <div className="binmap-content">
          <div className="map-wrapper">
            <img src={BinMapImage} alt="Bin Map" className="binmap-image" />
          </div>
<<<<<<< HEAD
          {/* Extracted UI element */}
          <BinDetailCard details={binDetails} /> 
=======

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
>>>>>>> d064b8e5e988aa022e24c04bcfda8295552cda57
        </div>
      </main>

      <button className="add-ecobin-btn" onClick={() => toggleModal(true)}>+ Add EcoBin</button>

      {/* Extracted UI element */}
      {showModal && (
        <AddBinModal 
          formData={formData} 
          onChange={handleFormChange} 
          onSubmit={handleFormSubmit} 
          onClose={() => toggleModal(false)} 
        />
      )}
    </div>
  );
};

export default BinMapPage;