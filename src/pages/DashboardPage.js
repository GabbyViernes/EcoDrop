import React, { useState, useRef, useEffect } from 'react';
import Sidebar from '../components/Sidebar';
import StatCard from '../components/StatCard';
import '../styles/DashboardPage.css';
import BinMapImage from '../assets/images/BinMapImage.png';

const DashboardPage = ({ onLogout, onNavigate }) => {
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const stats = [
    { label: "Total Plastic Diverted", value: "1,240 kg", icon: "🌱" },
    { label: "Active User Growth", value: "+15%", icon: "📈" },
    { label: "Total Rewards Claimed", value: "850", icon: "🎁" }
  ];

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);
    return () => document.removeEventListener("mousedown", handleClickOutside);
  }, []);

  return (
    <div className="dashboard-container">
      <Sidebar activeTab="Overview" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="dashboard-main">
        <header className="dashboard-header">
          <div className="search-bar">
            <input type="text" placeholder="Search transactions, user IDs, or bins..." />
          </div>

          <div className="header-controls">
            <div className="dropdown-wrapper" ref={profileRef}>
              <div
                className="profile-trigger"
                onClick={() => setShowProfileMenu(!showProfileMenu)}
              >
                <span>Admin</span>
                <div className="profile-circle"></div>
              </div>
              {showProfileMenu && (
                <ul className="dropdown-menu floating">
                  <li><button className="dropdown-item">Settings</button></li>
                  <li><button className="dropdown-item">Help Center</button></li>
                  <li className="menu-divider"></li>
                  <li><button className="dropdown-item">System Health</button></li>
                  <li><button className="dropdown-item" onClick={onLogout}>Logout</button></li>
                </ul>
              )}
            </div>
          </div>
        </header>

        <section className="analytics-grid">
          {stats.map((stat, index) => (
            <StatCard
              key={index}
              icon={stat.icon}
              label={stat.label}
              value={stat.value}
            />
          ))}
        </section>

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
                  <div className="progress-bar critical" style={{ width: '85%' }}></div>
                </div>
                <span className="percent">85%</span>
              </div>
              <div className="bin-item">
                <span>BIN-002 (SM Downtown)</span>
                <div className="progress-container">
                  <div className="progress-bar normal" style={{ width: '45%' }}></div>
                </div>
                <span className="percent">45%</span>
              </div>
            </div>
          </div>
        </section>

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