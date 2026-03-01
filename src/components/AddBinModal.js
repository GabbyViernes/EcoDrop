import React from 'react';

const AddBinModal = ({ formData, onChange, onSubmit, onClose }) => {
  // Close the modal if the user clicks the dark background outside the modal card
  const handleOverlayClick = (e) => {
    if (e.target.classList.contains('modal-overlay')) {
      onClose();
    }
  };

  return (
    <div className="modal-overlay" onClick={handleOverlayClick}>
      <div className="modal-card">
        <div className="modal-header">
          <h3>Add New EcoBin</h3>
          <button className="modal-close-btn" type="button" onClick={onClose}>×</button>
        </div>
        <p className="modal-subtitle">Fill in the details to register a new EcoBin location.</p>

        <form className="modal-form" onSubmit={onSubmit}>
          <div className="modal-form-row">
            <div className="modal-form-group">
              <label>Bin ID</label>
              <input
                type="text"
                name="binId"
                placeholder="e.g. BIN-003"
                value={formData.binId}
                onChange={onChange}
                required
              />
            </div>
            <div className="modal-form-group">
              <label>Bin Type</label>
              <select name="type" value={formData.type} onChange={onChange} required>
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
              onChange={onChange}
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
              onChange={onChange}
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
                onChange={onChange}
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
                onChange={onChange}
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
              onChange={onChange}
              required
            />
          </div>

          <div className="modal-actions">
            <button type="button" className="modal-cancel-btn" onClick={onClose}>
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
  );
};

export default AddBinModal;