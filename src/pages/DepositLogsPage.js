import React from 'react';
import NavigationBar from '../components/NavigationBar';
import DepositLogsTable from '../components/DepositLogsTable'; 
import { useSearchLogs } from '../hooks/useSearchLogs';
import '../styles/DepositLogsPage.css';

const MOCK_DEPOSITS = [
  { id: 'TXN-001', user: 'Jasmaine Rosallo', binId: 'BIN-001', material: 'Polyethylene', weight: '2.5 kg', date: '2026-02-20', reward: '5 pts' },
  { id: 'TXN-002', user: 'Gabrielle Albert', binId: 'BIN-002', material: 'Plastic', weight: '1.2 kg', date: '2026-02-21', reward: '3 pts' }
];

const DepositLogsPage = () => {
  const { filteredData } = useSearchLogs(MOCK_DEPOSITS);

  return (
    <div className="depositlogs-page-shell">
      <NavigationBar />
      
      <main className="depositlogs-main">
        <header className="depositlogs-header">
          <h2>Deposit Logs</h2>
        </header>

        <section className="depositlogs-table-section">
          
          <DepositLogsTable data={filteredData} />
        </section>
      </main>
    </div>
  );
};

export default DepositLogsPage;