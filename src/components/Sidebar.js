import React from 'react';
import EcoDropLogoWord from '../assets/images/EcoDropLogoWord.png';

const Sidebar = ({ activeTab, onNavigate, onLogout }) => {
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
        <img src={EcoDropLogoWord} alt="EcoDrop Logo" className="sidebar-logo-img" />
      </div>
      <nav className="nav-menu">
        <ul>
          {menuItems.map((item) => (
            <li
              key={item.name}
              className={activeTab === item.name ? "active" : ""}
              onClick={() => onNavigate && onNavigate(item.name)}
            >
              {item.icon} {item.name}
            </li>
          ))}
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;