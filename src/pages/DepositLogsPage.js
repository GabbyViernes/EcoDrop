import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../styles/DepositLogsPage.css';

const MOCK_DEPOSITS = [
  {
    id: 'TXN-001',
    userId: 'USR-441',
    user: 'Jasmaine Rosallo',
    binId: 'BIN-001',
    material: 'Polyethylene',
    weight: '2.5 kg',
    timestamp: '2026-02-20 10:30 AM',
    reward: '5 pts',
  },
  {
    id: 'TXN-002',
    userId: 'USR-219',
    user: 'Gabrielle Albert',
    binId: 'BIN-002',
    material: 'Polyethylene',
    weight: '1.2 kg',
    timestamp: '2026-02-21 02:15 PM',
    reward: '3 pts',
  },
  {
    id: 'TXN-003',
    userId: 'USR-305',
    user: 'Gypsy Dane Carano-o',
    binId: 'BIN-001',
    material: 'Polypropylene',
    weight: '3.8 kg',
    timestamp: '2026-02-22 09:00 AM',
    reward: '8 pts',
  },
  {
    id: 'TXN-004',
    userId: 'USR-102',
    user: 'Jessel Fabi',
    binId: 'BIN-003',
    material: 'Polypropylene',
    weight: '0.9 kg',
    timestamp: '2026-02-22 11:45 AM',
    reward: '2 pts',
  },
  {
    id: 'TXN-005',
    userId: 'USR-558',
    user: 'Maria Clara',
    binId: 'BIN-002',
    material: 'Polyethylene',
    weight: '4.1 kg',
    timestamp: '2026-02-23 03:00 PM',
    reward: '10 pts',
  },
];

const MATERIAL_COLORS = {
  Polyethylene: '#4a8c50',
  Plastic: '#3a7abf',
  Polypropylene: '#8b5e3c',
  'Mixed Plastic': '#7a5fa8',
};

const DepositLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');
  const [sortField, setSortField] = useState('timestamp');
  const [sortDir, setSortDir] = useState('desc');

  const filtered = MOCK_DEPOSITS.filter((row) => {
    const q = searchQuery.toLowerCase();
    return (
      row.id.toLowerCase().includes(q) ||
      row.user.toLowerCase().includes(q) ||
      row.userId.toLowerCase().includes(q) ||
      row.binId.toLowerCase().includes(q) ||
      row.material.toLowerCase().includes(q)
    );
  });

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

  return (
    <div className="depositlogs-page-shell">
      <div className="hill h1" />
      <div className="hill h2" />
      <div className="hill h3" />

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
          <h2 className="depositlogs-title">Deposit Logs</h2>
        </header>

        <div className="logs-summary-row">
          <div className="logs-summary-card">
            <span className="summary-icon">📋</span>
            <div>
              <div className="summary-value">{MOCK_DEPOSITS.length}</div>
              <div className="summary-label">Total Transactions</div>
            </div>
          </div>
          <div className="logs-summary-card">
            <span className="summary-icon">⚖️</span>
            <div>
              <div className="summary-value">13.5 kg</div>
              <div className="summary-label">Total Weight</div>
            </div>
          </div>
          <div className="logs-summary-card">
            <span className="summary-icon">🎁</span>
            <div>
              <div className="summary-value">28 pts</div>
              <div className="summary-label">Rewards Issued</div>
            </div>
          </div>
          <div className="logs-summary-card">
            <span className="summary-icon">🗑️</span>
            <div>
              <div className="summary-value">3</div>
              <div className="summary-label">Active Bins</div>
            </div>
          </div>
        </div>

        <div className="logs-table-card">
          <div className="logs-table-header-row">
            <h3 className="logs-table-title">Transaction Records</h3>
            <span className="logs-count">{filtered.length} result{filtered.length !== 1 ? 's' : ''}</span>
          </div>

          <div className="logs-table-wrapper">
            <table className="logs-table">
              <thead>
                <tr>
                  {[
                    { key: 'id', label: 'Transaction ID' },
                    { key: 'user', label: 'User' },
                    { key: 'binId', label: 'Bin ID' },
                    { key: 'material', label: 'Material' },
                    { key: 'weight', label: 'Weight' },
                    { key: 'timestamp', label: 'Timestamp' },
                    { key: 'reward', label: 'Reward' },
                  ].map(({ key, label }) => (
                    <th key={key} onClick={() => handleSort(key)} className="sortable-th">
                      {label} <SortIcon field={key} />
                    </th>
                  ))}
                </tr>
              </thead>
              <tbody>
                {filtered.length === 0 ? (
                  <tr>
                    <td colSpan={7} className="logs-empty">No transactions found.</td>
                  </tr>
                ) : (
                  filtered.map((row, i) => (
                    <tr key={row.id} className={i % 2 === 0 ? 'row-even' : 'row-odd'}>
                      <td>
                        <span className="txn-id-badge">{row.id}</span>
                      </td>
                      <td>
                        <div className="user-cell">
                          <div className="user-avatar">
                            {row.user.charAt(0)}
                          </div>
                          <div>
                            <div className="user-name">{row.user}</div>
                            <div className="user-id">{row.userId}</div>
                          </div>
                        </div>
                      </td>
                      <td>
                        <span className="bin-id-pill">{row.binId}</span>
                      </td>
                      <td>
                        <span
                          className="material-tag"
                          style={{ backgroundColor: `${MATERIAL_COLORS[row.material] || '#889063'}22`,
                                   color: MATERIAL_COLORS[row.material] || '#889063',
                                   border: `1px solid ${MATERIAL_COLORS[row.material] || '#889063'}44` }}
                        >
                          {row.material}
                        </span>
                      </td>
                      <td className="weight-cell">{row.weight}</td>
                      <td className="timestamp-cell">{row.timestamp}</td>
                      <td>
                        <span className="reward-badge">{row.reward}</span>
                      </td>
                    </tr>
                  ))
                )}
              </tbody>
            </table>
          </div>
        </div>

      </main>
    </div>
  );
};

export default DepositLogsPage;