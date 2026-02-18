import React from 'react';
import Sidebar from '../components/Sidebar';
import '../styles/DepositLogsPage.css';

const DepositLogsPage = ({ onLogout, onNavigate }) => {
  return (
    <div className="depositlogs-container">
      <Sidebar activeTab="Deposit Logs" onNavigate={onNavigate} onLogout={onLogout} />

      <main className="depositlogs-main">
        {/* ... */}
      </main>
    </div>
  );
};

export default DepositLogsPage;