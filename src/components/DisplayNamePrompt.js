import React, { useState } from 'react';
import '../styles/DisplayNamePrompt.css';

function DisplayNamePrompt(props) {
  const [displayName, setDisplayName] = useState('');

  function handleSave() {
    if (!displayName.trim()) {
      return;
    }

    localStorage.setItem('ecodropDisplayName', displayName.trim());
    window.dispatchEvent(new Event('ecodropProfileUpdated'));
    props.onClose();
  }

  function handleSkip() {
    localStorage.setItem('ecodropDisplayName', 'Admin');
    window.dispatchEvent(new Event('ecodropProfileUpdated'));
    props.onClose();
  }

  return (
    <div className="display-name-overlay">
      <div className="display-name-modal">
        <h2>Welcome to EcoDrop</h2>
        <p>What should EcoDrop call you?</p>

        <input
          type="text"
          placeholder="Enter your name or nickname"
          value={displayName}
          onChange={(e) => setDisplayName(e.target.value)}
        />

        <div className="display-name-actions">
          <button
            type="button"
            className="display-name-save-btn"
            onClick={handleSave}
          >
            Save
          </button>

          <button
            type="button"
            className="display-name-skip-btn"
            onClick={handleSkip}
          >
            Skip
          </button>
        </div>
      </div>
    </div>
  );
}

export default DisplayNamePrompt;