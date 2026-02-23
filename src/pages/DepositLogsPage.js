import React from 'react';
import NavigationBar from '../components/NavigationBar';
import '../styles/DepositLogsPage.css';

const DepositLogsPage = () => {
  return (
    <div className="depositlogs-page-shell">
      <NavigationBar />

      <main className="depositlogs-main">
        {/* Deposit Logs content goes here */}
      </main>
    </div>
  );
};

export default DepositLogsPage;