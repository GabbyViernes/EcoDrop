import React from 'react';

const StatCard = ({ icon, label, value }) => {
  return (
    <div className="stat-card">
      <span className="stat-icon">{icon}</span>
      <div>
        <p className="stat-label">{label}</p>
        <h3 className="stat-value">{value}</h3>
      </div>
    </div>
  );
};

export default StatCard;