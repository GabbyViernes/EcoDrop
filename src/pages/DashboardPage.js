import React, { useState } from 'react';
import { useRef, useEffect } from 'react';      
import '../styles/DashboardPage.css';
import BinMapImage from '../assets/images/BinMapImage.png'; 

const DashboardPage = (onLogout) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [showSettingsMenu, setShowSettingsMenu] = useState(false);
  
    const settingsRef = useRef(null);
    const profileRef = useRef(null);

useEffect(() => {
  const handleClickOutside = (event) => {
    // Close settings if clicked outside
    if (settingsRef.current && !settingsRef.current.contains(event.target)) {
      setShowSettingsMenu(false);
    }
    // Close profile if clicked outside
    if (profileRef.current && !profileRef.current.contains(event.target)) {
      setShowProfileMenu(false);
    }
  };

  document.addEventListener("mousedown", handleClickOutside);
  return () => document.removeEventListener("mousedown", handleClickOutside);
}, []);
  const stats = [
    { label: "Total Plastic Diverted", value: "1,240 kg", icon: "🌱" },
    { label: "Active User Growth", value: "+15%", icon: "📈" },
    { label: "Total Rewards Claimed", value: "850", icon: "🎁" }
  ];

  return (
    <div className="dashboard-container">
      {/* 1. SIDEBAR: Partner/Merchant & Management Links */}
      <aside className="dashboard-sidebar">
        <div className="logo-section">
          <h2>EcoDrop Admin</h2>
        </div>
        <nav className="nav-menu">
          <ul>
            <li className="active">📊 Overview</li>
            <li>📍 Bin Locator</li>
            <li>📜 Deposit Logs</li>
            <li>🤝 Partner Management</li>
            <li>🎟️ Rewards & Vouchers</li>
            <li>⚙️ Threshold Config</li>
          </ul>
        </nav>
      </aside>

      

      {/* MAIN CONTENT AREA */}
      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="search-bar">
            <input type="text" placeholder="Search transactions, user IDs, or bins..." />
          </div>
          
          <div className="header-controls">
            {/* SETTINGS ICON & DROPDOWN */}
            <div className="dropdown-wrapper" ref={settingsRef}>
              <button 
                className="icon-button" 
                onClick={() => { 
                  setShowSettingsMenu(!showSettingsMenu); 
                  setShowProfileMenu(false); 
                }}
              >
                ⚙️
              </button>
              {showSettingsMenu && (
                <ul className="dropdown-menu">
                  <li>Settings</li>
                  <li>Help Center</li>
                  <li className="menu-divider"></li>
                  <li>System Health</li>
                </ul>
              )}
            </div>

            {/* PROFILE ICON & DROPDOWN */}
            <div className="dropdown-wrapper" ref={profileRef}>
              <div 
                className="profile-trigger" 
                onClick={() => { 
                  setShowProfileMenu(!showProfileMenu); 
                  setShowSettingsMenu(false); 
                }}
              >
                <span>Admin</span>
                <div className="profile-circle"></div>
              </div>
              {showProfileMenu && (
                <ul className="dropdown-menu floating">
                  <li>Edit Profile</li>
                  <li>Switch Account</li>
                  <li>Activity Log</li>
                  <li className="menu-divider"></li>
                  <li className="logout-option" onClick={onLogout}>Logout</li>
                </ul>
              )}
            </div>
          </div>
        </header>


        
        {/* 4. SUSTAINABILITY ANALYTICS */}
        <section className="analytics-grid">
          {stats.map((stat, index) => (
            <div key={index} className="stat-card">
              <span className="stat-icon">{stat.icon}</span>
              <div>
                <p className="stat-label">{stat.label}</p>
                <h3 className="stat-value">{stat.value}</h3>
              </div>
            </div>
          ))}
        </section>

        {/* 2. LIVE BIN MONITORING & MAP */}
        <section className="dashboard-middle-row">
          <div className="map-card">
            <h3>Bin Locator Map</h3>
            <div className="map-container">
              <img src={BinMapImage} alt="Bin Map" className="bin-map-image" />
            </div>
          </div>
          
          <div className="bin-status-card">
            <h3>Live Bin Status</h3>
            <div className="bin-list">
              <div className="bin-item">
                <span>BIN-001 (Limketkai)</span>
                <div className="progress-container">
                  <div className="progress-bar critical" style={{width: '85%'}}></div>
                </div>
                <span className="percent">85%</span>
              </div>
              <div className="bin-item">
                <span>BIN-002 (SM Downtown)</span>
                <div className="progress-container">
                  <div className="progress-bar normal" style={{width: '45%'}}></div>
                </div>
                <span className="percent">45%</span>
              </div>
            </div>
          </div>
        </section>

        {/* 3. DEPOSIT TRANSACTION LOGS (Preview) */}
        <section className="logs-section">
          <h3>Recent Deposit Transactions</h3>
          <table className="logs-table">
            <thead>
              <tr>
                <th>User ID</th>
                <th>Timestamp</th>
                <th>Location</th>
                <th>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              <tr>
                <td>#USER-9921</td>
                <td>2026-02-16 10:30 AM</td>
                <td>Limketkai Center</td>
                <td>1.2 kg</td>
              </tr>
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default DashboardPage;