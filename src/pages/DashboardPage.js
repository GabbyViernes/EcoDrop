import React from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import NavigationBar from '../components/NavigationBar';
import '../styles/DashboardPage.css';
import BinMapImage from '../assets/images/BinMapImage.png';

function DashboardPage() {
  var navigate = useNavigate();

  var stats = [
    { label: 'Total Plastic Diverted', value: '1,240 kg', icon: '🌱' },
    { label: 'Active User Growth', value: '+15%', icon: '📈' },
    { label: 'Total Rewards Claimed', value: '850', icon: '🎁' }
  ];

  return (
    <div className="dashboard-page-shell">
      <div className="hill h1"></div>
      <div className="hill h2"></div>
      <div className="hill h3"></div>

      <NavigationBar />

      <main className="dashboard-content">
        <section className="dashboard-title-card">
          <div>
            <h1>EcoDrop Admin Dashboard</h1>
            <p>Monitor bin activity, recycling progress, and recent deposit transactions.</p>
          </div>
          <button className="add-bin-btn" type="button">+ Add EcoBin</button>
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