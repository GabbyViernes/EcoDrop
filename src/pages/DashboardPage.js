import React, { useEffect, useState } from 'react';
import StatCard from '../components/StatCard';
import NavigationBar from '../components/NavigationBar';
import DisplayNamePrompt from '../components/DisplayNamePrompt';
import '../styles/DashboardPage.css';
import BinMapImage from '../assets/images/BinMapImage.png';
import useBins from '../hooks/useBins';
import { API_BASE_URL } from '../api/config';

function DashboardPage() {
  const [showDisplayNamePrompt, setShowDisplayNamePrompt] = useState(false);
  const { bins } = useBins(); 
  
  // New state variables for the Deposit Logs API
  const [depositLogs, setDepositLogs] = useState([]);
  const [loadingLogs, setLoadingLogs] = useState(true);

  const stats = [
    { label: 'Total Plastic Diverted', value: '1,240 kg', icon: '🌱' },
    { label: 'Active User Growth', value: '+15%', icon: '📈' },
    { label: 'Total Rewards Claimed', value: '850', icon: '🎁' }
  ];

  useEffect(() => {
    // 1. Handle Display Name Prompt
    const savedDisplayName = localStorage.getItem('ecodropDisplayName');
    if (!savedDisplayName) {
      setShowDisplayNamePrompt(true);
    }

    // 2. Fetch live deposit logs from Django
    const fetchDepositLogs = async () => {
      try {
        const token = localStorage.getItem('ecodropToken');
        const response = await fetch(`${API_BASE_URL}/deposit-logs/`, {
          headers: {
            'Content-Type': 'application/json',
            // Include token just in case the endpoint requires authentication
            'Authorization': token ? `Token ${token}` : ''
          }
        });

        if (!response.ok) throw new Error('Failed to fetch deposit logs');
        
        const data = await response.json();
        setDepositLogs(data);
      } catch (error) {
        console.error("Error fetching deposit logs:", error);
      } finally {
        setLoadingLogs(false);
      }
    };

    fetchDepositLogs();
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
        <div className="dashboard-title-card">
          <div>
            <h1>EcoDrop Admin Dashboard</h1>
            <p>Monitor bin activity, recycling progress, and recent deposit transactions.</p>
          </div>
        </div>

        <div className="analytics-grid">
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
        </div>

        <div className="dashboard-middle-row">
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
        </div>

        <section className="logs-section">
          <h3>Recent Deposit Transactions</h3>
          <table className="logs-table">
            <thead>
              <tr>
                <th>User</th>
                <th>Timestamp</th>
                <th>Bin ID</th>
                <th>Weight (kg)</th>
              </tr>
            </thead>
            <tbody>
              {/* Dynamically render the fetched API data */}
              {loadingLogs ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '15px' }}>
                    Loading transactions...
                  </td>
                </tr>
              ) : depositLogs.length === 0 ? (
                <tr>
                  <td colSpan="4" style={{ textAlign: 'center', padding: '15px' }}>
                    No recent transactions found.
                  </td>
                </tr>
              ) : (
                depositLogs.map((log) => (
                  <tr key={log.id}>
                    <td>{log.user_display || `User #${log.user}`}</td>
                    <td>{new Date(log.timestamp).toLocaleString()}</td>
                    <td>{log.bin_display || `Bin #${log.smart_bin}`}</td>
                    <td>{log.weight_kg} kg</td>
                  </tr>
                ))
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
}

export default DashboardPage;