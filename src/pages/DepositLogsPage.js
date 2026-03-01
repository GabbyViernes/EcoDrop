import React from 'react';
import NavigationBar from '../components/NavigationBar';
import { useSearchLogs } from '../hooks/useSearchLogs';
import '../styles/DepositLogsPage.css';

// 1. Moved static data OUTSIDE the component so it isn't re-declared on every render
const MOCK_DEPOSITS = [
  { id: 'TXN-001', user: 'Jasmaine Rosallo', binId: 'BIN-001', material: 'Polyethylene', weight: '2.5 kg', date: '2026-02-20', reward: '5 pts' },
  { id: 'TXN-002', user: 'Gabrielle Albert', binId: 'BIN-002', material: 'Plastic', weight: '1.2 kg', date: '2026-02-21', reward: '3 pts' }
];

const DepositLogsPage = () => {
  // 2. Using custom hook to handle logic
  const { searchQuery, setSearchQuery, filteredData } = useSearchLogs(MOCK_DEPOSITS);

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
          {/* For future UI updates, you can extract this table into a <LogTable data={filteredData} /> component */}
          <table className="depositlogs-table">
            {/* Table headers and body mapping over filteredData... */}
          </table>
        </section>
      </main>
    </div>
  );
};

export default DepositLogsPage;