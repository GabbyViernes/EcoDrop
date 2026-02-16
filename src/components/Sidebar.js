import React from 'react';

const Sidebar = ({ activeTab }) => {
  const menuItems = [
    { name: "Overview", icon: "📊" },
    { name: "Bin Locator", icon: "📍" },
    { name: "Deposit Logs", icon: "📜" },
    { name: "Partner Management", icon: "🤝" },
    { name: "Rewards & Vouchers", icon: "🎟️" },
    { name: "Threshold Config", icon: "⚙️" }
  ];

  return (
    <aside className="dashboard-sidebar">
      <div className="logo-section">
        <h2>EcoDrop Admin</h2>
      </div>
      <nav className="nav-menu">
        <ul>
          {menuItems.map((item) => (
            <li key={item.name} className={activeTab === item.name ? "active" : ""}>
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;