import React, { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SettingsPage.css';

function SettingsPage() {
  const navigate = useNavigate();
  const fileInputRef = useRef(null);

  const [displayName, setDisplayName] = useState('');
  const [profileImage, setProfileImage] = useState('');
  const [theme, setTheme] = useState('light');
  const [notifications, setNotifications] = useState(true);
  const [rememberMe, setRememberMe] = useState(false);

  const [auditLogsEnabled, setAuditLogsEnabled] = useState(true);
  const [autoBackupEnabled, setAutoBackupEnabled] = useState(true);
  const [backupFrequency, setBackupFrequency] = useState('weekly');
  const [discourageSearchEngines, setDiscourageSearchEngines] = useState(true);

  const [message, setMessage] = useState('');

  function applyTheme(selectedTheme) {
    const prefersDark = window.matchMedia('(prefers-color-scheme: dark)').matches;
    const resolvedTheme =
      selectedTheme === 'system'
        ? (prefersDark ? 'dark' : 'light')
        : selectedTheme;

    document.body.classList.remove('ecodrop-light-theme', 'ecodrop-dark-theme');

    if (resolvedTheme === 'dark') {
      document.body.classList.add('ecodrop-dark-theme');
    } else {
      document.body.classList.add('ecodrop-light-theme');
    }
  }

  useEffect(() => {
    const savedDisplayName = localStorage.getItem('ecodropDisplayName') || '';
    const savedProfileImage = localStorage.getItem('ecodropProfileImage') || '';
    const savedTheme = localStorage.getItem('ecodropTheme') || 'light';
    const savedNotifications = localStorage.getItem('ecodropNotifications');
    const savedRememberMe = localStorage.getItem('ecodropRememberMe');

    const savedAuditLogsEnabled = localStorage.getItem('ecodropAuditLogsEnabled');
    const savedAutoBackupEnabled = localStorage.getItem('ecodropAutoBackupEnabled');
    const savedBackupFrequency = localStorage.getItem('ecodropBackupFrequency') || 'weekly';
    const savedDiscourageSearchEngines = localStorage.getItem('ecodropDiscourageSearchEngines');

    setDisplayName(savedDisplayName);
    setProfileImage(savedProfileImage);
    setTheme(savedTheme);
    setNotifications(savedNotifications !== 'false');
    setRememberMe(savedRememberMe === 'true');

    setAuditLogsEnabled(savedAuditLogsEnabled !== 'false');
    setAutoBackupEnabled(savedAutoBackupEnabled !== 'false');
    setBackupFrequency(savedBackupFrequency);
    setDiscourageSearchEngines(savedDiscourageSearchEngines !== 'false');

    applyTheme(savedTheme);
  }, []);

  function handleOpenFilePicker() {
    if (fileInputRef.current) {
      fileInputRef.current.click();
    }
  }

  function handleProfileImageChange(e) {
    const file = e.target.files && e.target.files[0];

    if (!file) {
      return;
    }

    const reader = new FileReader();

    reader.onloadend = function () {
      setProfileImage(reader.result);
    };

    reader.readAsDataURL(file);
  }

  function handleRemoveProfileImage() {
    setProfileImage('');
  }

function handleSaveSettings(e) {
  e.preventDefault();

  localStorage.setItem('ecodropDisplayName', displayName.trim() || 'Admin');
  localStorage.setItem('ecodropProfileImage', profileImage);
  localStorage.setItem('ecodropTheme', theme);
  localStorage.setItem('ecodropNotifications', notifications);
  localStorage.setItem('ecodropRememberMe', rememberMe);

  localStorage.setItem('ecodropAuditLogsEnabled', auditLogsEnabled);
  localStorage.setItem('ecodropAutoBackupEnabled', autoBackupEnabled);
  localStorage.setItem('ecodropBackupFrequency', backupFrequency);
  localStorage.setItem('ecodropDiscourageSearchEngines', discourageSearchEngines);

  applyTheme(theme);

  window.dispatchEvent(new Event('ecodropProfileUpdated'));

  setMessage('Settings saved successfully!');
}

  function handleResetSettings() {
    setDisplayName('');
    setProfileImage('');
    setTheme('light');
    setNotifications(true);
    setRememberMe(false);

    setAuditLogsEnabled(true);
    setAutoBackupEnabled(true);
    setBackupFrequency('weekly');
    setDiscourageSearchEngines(true);

    localStorage.removeItem('ecodropDisplayName');
    localStorage.removeItem('ecodropProfileImage');
    localStorage.removeItem('ecodropTheme');
    localStorage.removeItem('ecodropNotifications');
    localStorage.removeItem('ecodropRememberMe');

    localStorage.removeItem('ecodropAuditLogsEnabled');
    localStorage.removeItem('ecodropAutoBackupEnabled');
    localStorage.removeItem('ecodropBackupFrequency');
    localStorage.removeItem('ecodropDiscourageSearchEngines');

    applyTheme('light');
    setMessage('Settings reset successfully!');
  }

  function handleBackToDashboard() {
    navigate('/dashboard');
  }

  return (
    <div className="settings-page">
      <div className="settings-container">
        <h1 className="settings-title">Settings</h1>
        <p className="settings-subtitle">
          Manage your admin personalization, appearance, and system controls.
        </p>

        <form className="settings-form" onSubmit={handleSaveSettings}>
          <div className="settings-section">
            <h2>Admin Personalization</h2>

            <div className="settings-group">
              <label htmlFor="displayName">Display Name</label>
              <input
                id="displayName"
                type="text"
                value={displayName}
                onChange={(e) => setDisplayName(e.target.value)}
                placeholder="What should EcoDrop call you?"
              />
            </div>

            <div className="settings-profile-upload">
              <label className="settings-upload-label">Profile Picture</label>

              <div className="settings-profile-preview">
                {profileImage ? (
                  <img
                    src={profileImage}
                    alt="Admin Profile Preview"
                    className="settings-profile-image"
                  />
                ) : (
                  <div className="settings-profile-placeholder">
                    {(displayName || 'A').charAt(0).toUpperCase()}
                  </div>
                )}
              </div>

              <input
                type="file"
                accept="image/*"
                ref={fileInputRef}
                className="settings-hidden-file-input"
                onChange={handleProfileImageChange}
              />

              <div className="settings-profile-actions">
                <button
                  type="button"
                  className="settings-upload-btn"
                  onClick={handleOpenFilePicker}
                >
                  Upload Picture
                </button>

                <button
                  type="button"
                  className="settings-remove-btn"
                  onClick={handleRemoveProfileImage}
                >
                  Remove Picture
                </button>
              </div>

              <small className="settings-help-text">
                Use a small or low-quality image for smoother storage and loading.
              </small>
            </div>
          </div>

          <div className="settings-section">
            <h2>Preferences</h2>

            <div className="settings-group">
              <label htmlFor="theme">Theme</label>
              <select
                id="theme"
                value={theme}
                onChange={(e) => setTheme(e.target.value)}
              >
                <option value="light">Light</option>
                <option value="dark">Dark</option>
                <option value="system">System Default</option>
              </select>
            </div>

            <div className="settings-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={notifications}
                  onChange={(e) => setNotifications(e.target.checked)}
                />
                Enable Notifications
              </label>
            </div>

            <div className="settings-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                Remember Me
              </label>
            </div>
          </div>

          <div className="settings-section">
            <h2>Security & Maintenance</h2>
            <p className="settings-section-text">
              Tools to protect and monitor the site&apos;s health.
            </p>

            <div className="settings-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={auditLogsEnabled}
                  onChange={(e) => setAuditLogsEnabled(e.target.checked)}
                />
                Enable Audit Logs
              </label>
              <small className="settings-help-text">
                Track what the admin changed and when.
              </small>
            </div>

            <div className="settings-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={autoBackupEnabled}
                  onChange={(e) => setAutoBackupEnabled(e.target.checked)}
                />
                Enable Auto Backup
              </label>
              <small className="settings-help-text">
                Schedule automatic backups to prevent data loss.
              </small>
            </div>

            <div className="settings-group">
              <label htmlFor="backupFrequency">Backup Frequency</label>
              <select
                id="backupFrequency"
                value={backupFrequency}
                onChange={(e) => setBackupFrequency(e.target.value)}
                disabled={!autoBackupEnabled}
              >
                <option value="daily">Daily</option>
                <option value="weekly">Weekly</option>
                <option value="monthly">Monthly</option>
              </select>
            </div>

            <div className="settings-checkbox-group">
              <label>
                <input
                  type="checkbox"
                  checked={discourageSearchEngines}
                  onChange={(e) => setDiscourageSearchEngines(e.target.checked)}
                />
                Discourage Search Engines
              </label>
              <small className="settings-help-text">
                Keep the site hidden while it is under development.
              </small>
            </div>
          </div>

          <div className="settings-section">
            <h2>Admin Access</h2>
            <p className="settings-section-text">
              Current system mode: <strong>Single Admin</strong>
            </p>
            <small className="settings-help-text">
              Multi-admin can be added in the future with role-based access and permissions.
            </small>
          </div>

          {message && <p className="settings-message">{message}</p>}

          <div className="settings-actions">
            <button type="submit" className="settings-save-btn">
              Save Settings
            </button>

            <button
              type="button"
              className="settings-reset-btn"
              onClick={handleResetSettings}
            >
              Reset
            </button>

            <button
              type="button"
              className="settings-back-btn"
              onClick={handleBackToDashboard}
            >
              Back to Dashboard
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

export default SettingsPage;