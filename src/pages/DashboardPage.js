import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import StatCard from '../components/StatCard';
import NavigationBar from '../components/NavigationBar';
import DisplayNamePrompt from '../components/DisplayNamePrompt';
import '../styles/DashboardPage.css';
import BinMapImage from '../assets/images/BinMapImage.png';
import { useBins } from '../context/BinContext';  

function DashboardPage() {
  const navigate = useNavigate();

  const [showDisplayNamePrompt, setShowDisplayNamePrompt] = useState(false);
  const { bins } = useBins(); // <-- GRAB BINS FROM CONTEXT
  const stats = [
    { label: 'Total Plastic Diverted', value: '1,240 kg', icon: '🌱' },
    { label: 'Active User Growth', value: '+15%', icon: '📈' },
    { label: 'Total Rewards Claimed', value: '850', icon: '🎁' }
  ];

  useEffect(() => {
    const savedDisplayName = localStorage.getItem('ecodropDisplayName');

    if (!savedDisplayName) {
      setShowDisplayNamePrompt(true);
    }
  }, []);

  function handleCloseDisplayNamePrompt() {
    setShowDisplayNamePrompt(false);
  }

  return (
    <div className="dashboard-page-shell">
      <div className="hill h1"></div>
      <div className="hill h2"></div>
      <div className="hill h3"></div>

      <NavigationBar />

      {showDisplayNamePrompt && (
        <DisplayNamePrompt onClose={handleCloseDisplayNamePrompt} />
      )}

      <main className="dashboard-content">
        <section className="dashboard-title-card">
          <div>
            <h1>EcoDrop Admin Dashboard</h1>
            <p>Monitor bin activity, recycling progress, and recent deposit transactions.</p>
          </div>
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
              {bins.map((bin) => {
                const isCritical = bin.fillLevel >= 80;
                const barClass = isCritical ? 'critical' : (bin.fillLevel === 0 ? 'empty' : 'normal');
                return (
                  <div className="bin-item" key={bin.id}>
                    <span>{bin.id} ({bin.location})</span>
                    <div className="progress-container">
                      <div className={`progress-bar ${barClass}`} style={{ width: `${bin.fillLevel}%` }}></div>
                    </div>
                    <span className="percent">{bin.fillLevel}%</span>
                  </div>
                );
              })}
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