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
          {/* Extracted UI element */}
          <BinDetailCard details={binDetails} /> 
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