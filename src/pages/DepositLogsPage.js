import React, { useState, useEffect, useMemo } from 'react';
import axios from 'axios';
import NavigationBar from '../components/NavigationBar';
import '../styles/DepositLogsPage.css';

const MATERIAL_COLORS = {
  Polyethylen: '#4a8c50',
  Plastic: '#3a7abf',
  Polypropylene: '#8b5e3c',
  'Mixed Plastic': '#7a5fa8',
};

const DepositLogsPage = () => {
  const [deposits, setDeposits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDir, setSortDir] = useState('desc');

  // --- FORM STATE PARA SA DROPDOWN ---
  const [showForm, setShowForm] = useState(false);
  const [newLog, setNewLog] = useState({
    user: 1, // Default user ID
    smart_bin: 1, // Default bin ID
    material: 'Polyethylene',
    weight_kg: '',
    reward_points: ''
  });

  const fetchLogs = async () => {
    try {
      const response = await axios.get('http://127.0.0.1:8000/api/deposit-logs/');
      setDeposits(response.data);
      setLoading(false);
    } catch (error) {
      console.error("Error fetching logs:", error);
      setLoading(false);
    }
  };

  useEffect(() => {
    fetchLogs();
  }, []);

  // --- FUNCTION PARA MAG-POST NG BAGONG LOG ---
  const handleAddLog = async (e) => {
    e.preventDefault();
    try {
      await axios.post('http://127.0.0.1:8000/api/deposit-logs/', newLog);
      setShowForm(false);
      setNewLog({ ...newLog, weight_kg: '', reward_points: '' }); // Reset
      fetchLogs(); // Refresh the table
    } catch (error) {
      alert("Error saving log. Check if User ID and Bin ID exist.");
    }
  };

  const stats = useMemo(() => {
    const totalWeight = deposits.reduce((sum, log) => sum + parseFloat(log.weight_kg || 0), 0);
    const totalPoints = deposits.reduce((sum, log) => sum + (log.reward_points || 0), 0);
    const activeBins = new Set(deposits.map(log => log.smart_bin)).size;
    
    return {
      count: deposits.length,
      weight: totalWeight.toFixed(1),
      points: totalPoints,
      bins: activeBins
    };
  }, [deposits]);

  const filtered = useMemo(() => {
    let result = deposits.filter((row) => {
      const q = searchQuery.toLowerCase();
      const txnId = `TXN-${String(row.id).padStart(3, '0')}`.toLowerCase();
      return (
        txnId.includes(q) ||
        row.user_display?.toLowerCase().includes(q) ||
        row.bin_display?.toLowerCase().includes(q) ||
        row.material?.toLowerCase().includes(q)
      );
    });

    return result.sort((a, b) => {
      const valA = a[sortField];
      const valB = b[sortField];
      if (sortDir === 'asc') return valA > valB ? 1 : -1;
      return valA < valB ? 1 : -1;
    });
  }, [deposits, searchQuery, sortField, sortDir]);

  function handleSort(field) {
    if (sortField === field) {
      setSortDir(sortDir === 'asc' ? 'desc' : 'asc');
    } else {
      setSortField(field);
      setSortDir('asc');
    }
  }

  function SortIcon({ field }) {
    if (sortField !== field) return <span className="sort-icon inactive">⇅</span>;
    return <span className="sort-icon active">{sortDir === 'asc' ? '↑' : '↓'}</span>;
  }

  if (loading) return <div className="loading">Loading records...</div>;

  return (
    <div className="depositlogs-page-shell">
      <NavigationBar />

      <main className="depositlogs-main">
        <header className="depositlogs-header">
          <div className="depositlogs-search-bar">
            <span className="search-icon">🔍</span>
            <input
              type="text"
              placeholder="Search transaction..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
            />
          </div>
          <button className="add-log-btn" onClick={() => setShowForm(!showForm)}>
            {showForm ? 'Close Form' : '+ Add Manual Entry'}
          </button>
        </header>

        {/* --- MANUAL ENTRY FORM WITH DROPDOWN --- */}
        {showForm && (
          <div className="manual-form-card">
            <h3>New Deposit Entry</h3>
            <form onSubmit={handleAddLog} className="manual-form">
              <div className="form-group">
                <label>Material:</label>
                <select 
                  value={newLog.material} 
                  onChange={(e) => setNewLog({...newLog, material: e.target.value})}
                >
                  <option value="Polyethylene">Polyethylene</option>
                  <option value="Polypropylene">Polypropylene</option>
                  <option value="Plastic">Plastic</option>
                  <option value="Mixed Plastic">Mixed Plastic</option>
                </select>
              </div>
              <div className="form-group">
                <label>Weight (kg):</label>
                <input 
                  type="number" step="0.1" required
                  value={newLog.weight_kg}
                  onChange={(e) => setNewLog({...newLog, weight_kg: e.target.value})}
                />
              </div>
              <div className="form-group">
                <label>Rewards:</label>
                <input 
                  type="number" required
                  value={newLog.reward_points}
                  onChange={(e) => setNewLog({...newLog, reward_points: e.target.value})}
                />
              </div>
              <button type="submit" className="submit-btn">Save Entry</button>
            </form>
          </div>
        )}

        {/* Summary Cards */}
        <div className="logs-summary-row">
          <div className="logs-summary-card">
            <span className="summary-icon">📋</span>
            <div>
              <div className="summary-value">{stats.count}</div>
              <div className="summary-label">Total Transactions</div>
            </div>
          </div>
          <div className="logs-summary-card">
            <span className="summary-icon">⚖️</span>
            <div>
              <div className="summary-value">{stats.weight} kg</div>
              <div className="summary-label">Total Weight</div>
            </div>
          </div>
          <div className="logs-summary-card">
            <span className="summary-icon">🎁</span>
            <div>
              <div className="summary-value">{stats.points} pts</div>
              <div className="summary-label">Rewards Issued</div>
            </div>
          </div>
          <div className="logs-summary-card">
            <span className="summary-icon">🗑️</span>
            <div>
              <div className="summary-value">{stats.bins}</div>
              <div className="summary-label">Active Bins</div>
            </div>
          </div>
        </div>

        <div className="logs-table-card">
          <div className="logs-table-header-row">
            <h3 className="logs-table-title">Transaction Records</h3>
            <span className="logs-count">{filtered.length} results</span>
          </div>

          <div className="logs-table-wrapper">
            <table className="logs-table">
              <thead>
                <tr>
                  {[
                    { key: 'id', label: 'Transaction ID' },
                    { key: 'user_display', label: 'User' },
                    { key: 'bin_display', label: 'Bin ID' },
                    { key: 'material', label: 'Material' },
                    { key: 'weight_kg', label: 'Weight' },
                    { key: 'timestamp', label: 'Timestamp' },
                    { key: 'reward_points', label: 'Reward' },
                  ].map(({ key, label }) => (
                    <th key={key} onClick={() => handleSort(key)} className="sortable-th">
                      {label} <SortIcon field={key} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.map((row, i) => (
                  <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                    <td><span className="txn-id-badge">TXN-{String(row.id).padStart(3, '0')}</span></td>
                    <td>
                      <div className="user-cell">
                        <div className="user-avatar">{row.user_display?.charAt(0)}</div>
                        <div>
                          <div className="user-name">{row.user_display}</div>
                          <div className="user-id">USR-{row.user}</div>
                        </div>
                      </div>
                    </td>
                    <td><span className="bin-id-pill">{row.bin_display || 'N/A'}</span></td>
                    <td>
                      <span className="material-tag" style={{ 
                        backgroundColor: `${MATERIAL_COLORS[row.material] || '#889063'}22`,
                        color: MATERIAL_COLORS[row.material] || '#889063',
                        border: `1px solid ${MATERIAL_COLORS[row.material] || '#889063'}44` 
                      }}>
                        {row.material}
                      </span>
                    </td>
                    <td className="weight-cell">{row.weight_kg} kg</td>
                    <td className="timestamp-cell">{new Date(row.timestamp).toLocaleString()}</td>
                    <td><span className="reward-badge">{row.reward_points} pts</span></td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </main>
    </div>
  );
};

export default DepositLogsPage;