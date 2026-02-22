import React, { useState, useRef, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import '../styles/DashboardPage.css';
import BinMapImage from '../assets/images/BinMapImage.png';
import logoWord from '../assets/images/EcoDropLogoWord.png';

function DashboardPage(props) {
  var onLogout = props.onLogout;
  var navigate = useNavigate();

  var _useState = useState(false);
  var showProfileMenu = _useState[0];
  var setShowProfileMenu = _useState[1];

  var profileRef = useRef(null);

  var stats = [
    { label: 'Total Plastic Diverted', value: '1,240 kg', icon: '🌱' },
    { label: 'Active User Growth', value: '+15%', icon: '📈' },
    { label: 'Total Rewards Claimed', value: '850', icon: '🎁' }
  ];

  useEffect(function () {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, [setShowProfileMenu]); // ✅ ESLint warning fixed

  function handleLogoutClick() {
  localStorage.removeItem('ecodropLoggedIn');

  if (onLogout) {
    onLogout();
    return;
  }

  navigate('/', { replace: true }); // go to homepage public version
}

  return (
    <div className="dashboard-page-shell">
      <div className="hill h1"></div>
      <div className="hill h2"></div>
      <div className="hill h3"></div>

      <header className="dashboard-topbar">
        <div
          className="brand-logo"
          onClick={function () {
            navigate('/');
          }}
        >
          <img src={logoWord} alt="EcoDrop" className="brand-logo-img" />
        </div>

        <nav className="dashboard-nav">
          <button
            type="button"
            onClick={function () {
              navigate('/');
            }}
          >
            Home
          </button>

          <button
            type="button"
            onClick={function () {
              navigate('/about');
            }}
          >
            About
          </button>

          <button
            type="button"
            onClick={function () {
              navigate('/binmap');
            }}
          >
            Bin Locator
          </button>

          <button
            type="button"
            onClick={function () {
              alert('Help page is not available yet.');
            }}
          >
            Help
          </button>

          <button type="button" className="active">
            Dashboard
          </button>
        </nav>

        <div className="header-controls">
          <div className="search-bar">
            <input type="text" placeholder="Search transactions, users, bins..." />
          </div>

          <div className="dropdown-wrapper" ref={profileRef}>
            <div
              className="profile-trigger"
              onClick={function () {
                setShowProfileMenu(!showProfileMenu);
              }}
            >
              <span>Admin</span>
              <div className="profile-circle"></div>
            </div>

            {showProfileMenu && (
              <ul className="dropdown-menu">
                <li>
                  <button className="dropdown-item" type="button">
                    Settings
                  </button>
                </li>
                <li>
                  <button className="dropdown-item" type="button">
                    Help Center
                  </button>
                </li>
                <li className="menu-divider"></li>
                <li>
                  <button className="dropdown-item" type="button">
                    System Health
                  </button>
                </li>
                <li>
                  <button
                    className="dropdown-item logout-item"
                    type="button"
                    onClick={handleLogoutClick}
                  >
                    Logout
                  </button>
                </li>
              </ul>
            )}
          </div>
        </div>
      </header>

      <main className="dashboard-content">
        <section className="dashboard-title-card">
          <div>
            <h1>EcoDrop Admin Dashboard</h1>
            <p>Monitor bin activity, recycling progress, and recent deposit transactions.</p>
          </div>
          <button className="add-bin-btn" type="button">+ Add Bin</button>
        </section>

        <section className="analytics-grid">
          {stats.map(function (stat, index) {
            return (
              <StatCard
                key={index}
                icon={stat.icon}
                label={stat.label}
                value={stat.value}
              />
            );
          })}
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
}

export default DashboardPage;