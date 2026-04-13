import React from 'react';

const getMaterialStyle = (material) => {
    switch ((material || '').toLowerCase()) {
        case 'polyethylene':
            return { background: '#d9f2e6', color: '#2e7d32' };
        case 'polypropylene':
            return { background: '#ffe5d9', color: '#a84300' };
        case 'pet':
            return { background: '#d9e6ff', color: '#1e4db7' };
        default:
            return {};
    }
};

const DepositLogsTable = ({ data }) => {

    if (!data || data.length === 0) {
        return <div className="logs-empty">No logs found.</div>;
    }

    return (
        <div className="logs-table-wrapper">
            <table className="logs-table">

                {/* HEADER */}
                <thead>
                    <tr>
                        <th>Transaction ID</th>
                        <th>User</th>
                        <th>Bin ID</th>
                        <th>Material</th>
                        <th>Weight</th>
                        <th>Timestamp</th>
                        <th>Reward</th>
                    </tr>
                </thead>

                {/* BODY */}
                <tbody>
                    {data.map((row, index) => (
                        <tr
                            key={row.id}
                            className={index % 2 === 0 ? 'row-even' : 'row-odd'}
                        >

                            {/* TRANSACTION */}
                            <td>
                                <span className="txn-id-badge">
                                    TXN-{String(row.id).padStart(3, '0')}
                                </span>
                            </td>

                            {/* USER */}
                            <td>
                                <div className="user-cell">
                                    <div className="user-avatar">
                                        {(row.user_display || 'U')[0]}
                                    </div>

                                    <div>
                                        <div className="user-name">
                                            {row.user_display || 'Unknown'}
                                        </div>
                                        <div className="user-id">
                                            USR-{row.user}
                                        </div>
                                    </div>
                                </div>
                            </td>

                            {/* BIN */}
                            <td>
                                <span className="bin-id-pill">
                                    {row.bin_display || `BIN-${row.bin}`}
                                </span>
                            </td>

                            {/* MATERIAL */}
                            <td>
                                <span
                                    className="material-tag"
                                    style={getMaterialStyle(row.material)}
                                >
                                    {row.material
                                        ? row.material.charAt(0).toUpperCase() + row.material.slice(1)
                                        : 'N/A'}
                                </span>
                            </td>

                            {/* WEIGHT */}
                            <td className="weight-cell">
                                {row.weight_kg} kg
                            </td>

                            {/* TIME */}
                            <td className="timestamp-cell">
                                {row.timestamp
                                    ? new Date(row.timestamp).toLocaleString()
                                    : 'N/A'}
                            </td>

                            {/* REWARD */}
                            <td>
                                <span className="reward-badge">
                                    {row.reward_points || 0} pts
                                </span>
                            </td>

                        </tr>
                    ))}
                </tbody>

            </table>
        </div>
    );
};

export default DepositLogsTable;