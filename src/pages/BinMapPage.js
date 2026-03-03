import React, { useState, useRef } from 'react';
import NavigationBar from '../components/NavigationBar';
import BinMapImage from '../assets/images/BinMapImage.png';
import TrubbishPin from '../assets/images/TrubbishPin.png';
import { useAddBinForm } from '../hooks/useAddBinForm';
import '../styles/BinMapPage.css';

// Stable positions for the default bins
const SEEDED_POSITIONS = {
  'BIN-001': { top: 38, left: 22 },
  'BIN-002': { top: 55, left: 58 },
  'BIN-003': { top: 28, left: 72 },
};

// Stores randomly generated positions for newly added bins (persists across renders)
const generatedPositions = {};

function getPinPosition(binId) {
  if (SEEDED_POSITIONS[binId]) return SEEDED_POSITIONS[binId];
  if (generatedPositions[binId]) return generatedPositions[binId];
  const pos = {
    top: Math.floor(Math.random() * 55) + 12,
    left: Math.floor(Math.random() * 65) + 10,
  };
  generatedPositions[binId] = pos;
  return pos;
}

const BinMapPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [hoveredBinId, setHoveredBinId] = useState(null);
  const [tooltipSide, setTooltipSide] = useState('right');

  const [showEditModal, setShowEditModal] = useState(false);
  const [editingBin, setEditingBin] = useState(null);
  const [editFormData, setEditFormData] = useState({
    binId: '', location: '', address: '', coordinates: '',
    capacity: '', type: '', collectionSchedule: '',
  });

  const [showDeleteModal, setShowDeleteModal] = useState(false);
  const [deletingBin, setDeletingBin] = useState(null);

  const {
    bins,
    showModal,
    setShowModal,
    formData,
    handleFormChange,
    handleFormSubmit,
    handleEditBin,
    handleDeleteBin,
  } = useAddBinForm();

  const filteredBins = bins.filter((bin) =>
    bin.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
    bin.location.toLowerCase().includes(searchQuery.toLowerCase())
  );

  function handlePinMouseEnter(binId) {
    const pos = getPinPosition(binId);
    setTooltipSide(pos.left > 58 ? 'left' : 'right');
    setHoveredBinId(binId);
  }

  function openEditModal(bin) {
    setEditingBin(bin);
    setEditFormData({
      binId: bin.id,
      location: bin.location,
      address: bin.address || '',
      coordinates: bin.coordinates || '',
      capacity: bin.capacity || '',
      type: bin.type || '',
      collectionSchedule: bin.collectionSchedule || bin.nextCollection || '',
    });
    setShowEditModal(true);
  }

  function handleEditFormChange(e) {
    const { name, value } = e.target;
    setEditFormData(prev => ({ ...prev, [name]: value }));
  }

  function handleEditSubmit(e) {
    e.preventDefault();
    handleEditBin(editingBin.id, editFormData);
    setShowEditModal(false);
    setEditingBin(null);
  }

  function openDeleteModal(bin) {
    setDeletingBin(bin);
    setShowDeleteModal(true);
  }

  function confirmDelete() {
    handleDeleteBin(deletingBin.id);
    setShowDeleteModal(false);
    setDeletingBin(null);
  }

  function renderFormFields(data, onChange) {
    return (
      <>
        <div className="modal-form-row">
          <div className="modal-form-group">
            <label>Bin ID</label>
            <input type="text" name="binId" placeholder="e.g. BIN-003"
              value={data.binId} onChange={onChange} required />
          </div>
          <div className="modal-form-group">
            <label>Bin Type</label>
            <select name="type" value={data.type} onChange={onChange} required>
              <option value="">Select type...</option>
              <option value="Polyethylene">Polyethylene</option>
              <option value="Polypropylene">Polypropylene</option>
              <option value="Mixed Plastic">Mixed Plastic</option>
            </select>
          </div>
        </div>
        <div className="modal-form-group">
          <label>Location Name</label>
          <input type="text" name="location" placeholder="e.g. Ayala Centrio Mall"
            value={data.location} onChange={onChange} required />
        </div>
        <div className="modal-form-group">
          <label>Full Address</label>
          <input type="text" name="address" placeholder="e.g. Corrales Ave, Cagayan de Oro City"
            value={data.address} onChange={onChange} required />
        </div>
        <div className="modal-form-row">
          <div className="modal-form-group">
            <label>Coordinates</label>
            <input type="text" name="coordinates" placeholder="e.g. 8.4800° N, 124.6461° E"
              value={data.coordinates} onChange={onChange} required />
          </div>
          <div className="modal-form-group">
            <label>Capacity (kg)</label>
            <input type="text" name="capacity" placeholder="e.g. 20 kg"
              value={data.capacity} onChange={onChange} required />
          </div>
        </div>
        <div className="modal-form-group">
          <label>Collection Schedule</label>
          <input type="text" name="collectionSchedule" placeholder="e.g. Every Saturday 8:00 AM"
            value={data.collectionSchedule} onChange={onChange} required />
        </div>
      </>
    );
  }

  return (
    <div className="binmap-page-shell">
      <div className="hill h1" /><div className="hill h2" /><div className="hill h3" />
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
            <div className="map-pin-container">
              <img src={BinMapImage} alt="Bin Map" className="binmap-image" />

              {bins.map((bin) => {
                const pos = getPinPosition(bin.id);
                const fillColor = bin.fillLevel >= 80 ? '#e74c3c'
                  : bin.fillLevel >= 50 ? '#f39c12' : '#4caf50';
                const isHovered = hoveredBinId === bin.id;

                return (
                  <div
                    key={bin.id}
                    className={`trubbish-pin-wrapper${isHovered ? ' pin-hovered' : ''}`}
                    style={{ top: `${pos.top}%`, left: `${pos.left}%` }}
                    onMouseEnter={() => handlePinMouseEnter(bin.id)}
                    onMouseLeave={() => setHoveredBinId(null)}
                  >
                    <img src={TrubbishPin} alt={bin.id} className="trubbish-pin-img" />

                    {isHovered && (
                      <div className={`pin-tooltip pin-tooltip-${tooltipSide}`}>
                        <div className="pin-tooltip-header">
                          <span className="pin-tooltip-id">{bin.id}</span>
                          <span className="pin-tooltip-status" style={{ backgroundColor: fillColor }}>
                            {bin.status}
                          </span>
                        </div>
                        <div className="pin-tooltip-location">📍 {bin.location}</div>
                        <div className="pin-tooltip-row">
                          <span>Fill Level</span>
                          <span style={{ color: fillColor, fontWeight: 700 }}>{bin.fillLevel}%</span>
                        </div>
                        <div className="pin-tooltip-bar-bg">
                          <div className="pin-tooltip-bar"
                            style={{ width: `${bin.fillLevel}%`, backgroundColor: fillColor }} />
                        </div>
                        <div className="pin-tooltip-row">
                          <span>Capacity</span>
                          <span>{bin.capacity}</span>
                        </div>
                      </div>
                    )}
                  </div>
                );
              })}
            </div>
          </div>

          <div className="bin-cards-container">
            {filteredBins.length > 0 ? (
              filteredBins.map((bin) => {
                const fillColor = bin.fillLevel >= 80 ? '#e74c3c'
                  : bin.fillLevel >= 50 ? '#f39c12' : '#889063';
                return (
                  <div className="bin-detail-card" key={bin.id}>
                    <div className="bin-detail-header">
                      <span className="bin-id">{bin.id}</span>
                      <div className="bin-header-right">
                        <span className={`bin-status-badge ${bin.status.toLowerCase()}`}>
                          {bin.status}
                        </span>
                        <button className="bin-action-btn edit-btn"
                          onClick={() => openEditModal(bin)} title="Edit bin">✏️</button>
                        <button className="bin-action-btn delete-btn"
                          onClick={() => openDeleteModal(bin)} title="Delete bin">🗑️</button>
                      </div>
                    </div>
                    <p className="bin-location-name">{bin.location}</p>
                    <p className="bin-address">{bin.address}</p>
                    <div className="bin-fill-section">
                      <div className="bin-fill-label">
                        <span>Fill Level</span>
                        <span className="bin-fill-percent" style={{ color: fillColor }}>{bin.fillLevel}%</span>
                      </div>
                      <div className="bin-fill-bar-bg">
                        <div className="bin-fill-bar"
                          style={{ width: `${bin.fillLevel}%`, backgroundColor: fillColor }} />
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
              <p className="bins-empty-msg">No bins found matching your search.</p>
            )}
          </div>
        </div>
      </main>

      <button className="add-ecobin-btn" onClick={() => setShowModal(true)}>+ Add EcoBin</button>

      {showModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) setShowModal(false);
        }}>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Add New EcoBin</h3>
              <button className="modal-close-btn" type="button" onClick={() => setShowModal(false)}>×</button>
            </div>
            <p className="modal-subtitle">Fill in the details to register a new EcoBin location.</p>
            <form className="modal-form" onSubmit={handleFormSubmit}>
              {renderFormFields(formData, handleFormChange)}
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowModal(false)}>Cancel</button>
                <button type="button" className="modal-qr-btn"
                  onClick={() => alert('QR Code generation coming soon.')}>Add QR Code</button>
                <button type="submit" className="modal-submit-btn">Add EcoBin</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showEditModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) setShowEditModal(false);
        }}>
          <div className="modal-card">
            <div className="modal-header">
              <h3>Edit EcoBin</h3>
              <button className="modal-close-btn" type="button" onClick={() => setShowEditModal(false)}>×</button>
            </div>
            <p className="modal-subtitle">Update the details for <strong>{editingBin?.id}</strong>.</p>
            <form className="modal-form" onSubmit={handleEditSubmit}>
              {renderFormFields(editFormData, handleEditFormChange)}
              <div className="modal-actions">
                <button type="button" className="modal-cancel-btn" onClick={() => setShowEditModal(false)}>Cancel</button>
                <button type="submit" className="modal-submit-btn">Save Changes</button>
              </div>
            </form>
          </div>
        </div>
      )}

      {showDeleteModal && (
        <div className="modal-overlay" onClick={(e) => {
          if (e.target.classList.contains('modal-overlay')) setShowDeleteModal(false);
        }}>
          <div className="modal-card delete-confirm-card">
            <div className="modal-header">
              <h3>Delete EcoBin</h3>
              <button className="modal-close-btn" type="button" onClick={() => setShowDeleteModal(false)}>×</button>
            </div>
            <div className="delete-confirm-body">
              <div className="delete-confirm-icon">🗑️</div>
              <p>Are you sure you want to delete <strong>{deletingBin?.id}</strong>?</p>
              <p className="delete-confirm-sub">
                <strong>{deletingBin?.location}</strong> will be permanently removed. This action cannot be undone.
              </p>
            </div>
            <div className="modal-actions">
              <button type="button" className="modal-cancel-btn" onClick={() => setShowDeleteModal(false)}>Cancel</button>
              <button type="button" className="modal-delete-confirm-btn" onClick={confirmDelete}>Yes, Delete</button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default BinMapPage;