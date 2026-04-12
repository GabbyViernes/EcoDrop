import React from 'react';

const DepositLogsTable = ({ data }) => {
  return (
    <div className="logs-table-wrapper">
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
          {data && data.length > 0 ? (
            data.map((row) => (
              <tr key={row.id}>
                {/* 1. TXN ID Formatting */}
                <td>
                  <span className="txn-id-badge">
                    TXN-{String(row.id).padStart(3, '0')}
                  </span>
                </td>
                
                {/* 2. User Display Name */}
                <td>
                  <div className="user-cell">
                    <div className="user-name">{row.user_display || 'Unknown'}</div>
                    <div className="user-id">USR-{row.user}</div>
                  </div>
                </td>
                
                {/* 3. Bin ID or Location */}
                <td>
                  <span className="bin-id-pill">
                    {row.bin_display || 'N/A'}
                  </span>
                </td>
                
                {/* 4. Material Type - Added small Capitalization logic */}
                <td>
                  {row.material ? row.material.charAt(0).toUpperCase() + row.material.slice(1) : 'N/A'}
                </td>
                
                {/* 5. Weight in KG */}
                <td className="weight-cell">{row.weight_kg} kg</td>
                
                {/* 6. Formatted Timestamp */}
                <td className="timestamp-cell">
                  {new Date(row.timestamp).toLocaleDateString([], { 
                    year: 'numeric', 
                    month: 'short', 
                    day: 'numeric' 
                  })}
                </td>
                
                {/* 7. Reward Points */}
                <td>
                  <span className="reward-badge">
                    {row.reward_points} pts
                  </span>
                </td>
              </tr>
            ))
          ) : (
            <tr>
              <td colSpan="7" className="logs-empty">
                No deposits found matching your search.
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>
  );
};

export default DepositLogsTable;