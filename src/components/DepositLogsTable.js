import React from 'react';

const DepositLogsTable = ({ data }) => {
  return (
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
        {data.length > 0 ? (
          data.map((row) => (
            <tr key={row.id}>
              <td>{row.id}</td>
              <td>{row.user}</td>
              <td>{row.binId}</td>
              <td>{row.material}</td>
              <td>{row.weight}</td>
              <td>{row.date}</td>
              <td>{row.reward}</td>
            </tr>
          ))
        ) : (
          <tr>
            <td colSpan="7" style={{ textAlign: 'center', padding: '20px' }}>
              No deposits found matching your search.
            </td>
          </tr>
        )}
      </tbody>
    </table>
  );
};

export default DepositLogsTable;