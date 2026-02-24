import React, { useState } from 'react';
import NavigationBar from '../components/NavigationBar';
import '../styles/DepositLogsPage.css';

const DepositLogsPage = () => {
  const [searchQuery, setSearchQuery] = useState('');

  const deposits = [
    {
      id: 'TXN-001',
      user: 'Jasmaine Rosallo',
      binId: 'BIN-001',
      material: 'Polyethylene',
      weight: '2.5 kg',
      date: '2026-02-20 09:15 AM',
      reward: '5 pts'
    },
    {
      id: 'TXN-002',
      user: 'Gabrielle Albert',
      binId: 'BIN-002',
      material: 'Plastic',
      weight: '1.2 kg',
      date: '2026-02-21 10:30 AM',
      reward: '3 pts'
    }
  ];

  const filteredDeposits = deposits.filter(
    (d) =>
      d.id.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.user.toLowerCase().includes(searchQuery.toLowerCase()) ||
      d.binId.toLowerCase().includes(searchQuery.toLowerCase())
  );

  return (
    <div className="depositlogs-page-shell">
      <NavigationBar />

      <main className="depositlogs-main">
        <header className="depositlogs-header">
          <h2>Deposit Logs</h2>
          <input
            type="text"
            placeholder="Search transactions, users, bins..."
            value={searchQuery}
            onChange={(e) => setSearchQuery(e.target.value)}
          />
        </header>

        <section className="depositlogs-table-section">
          <table className="depositlogs-table">
            <thead>
              <tr>
                <th>Transaction ID</th>
                <th>User</th>
                <th>Bin ID</th>
                <th>Material</th>
                <th>Weight</th>
                <th>Date</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              {filteredDeposits.length > 0 ? (
                filteredDeposits.map((d) => (
                  <tr key={d.id}>
                    <td>{d.id}</td>
                    <td>{d.user}</td>
                    <td>{d.binId}</td>
                    <td>{d.material}</td>
                    <td>{d.weight}</td>
                    <td>{d.date}</td>
                    <td>{d.reward}</td>
                  </tr>
                ))
              ) : (
                <tr>
                  <td colSpan="7" style={{ textAlign: 'center' }}>
                    No deposits found
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </section>
      </main>
    </div>
  );
};

export default DepositLogsPage;
