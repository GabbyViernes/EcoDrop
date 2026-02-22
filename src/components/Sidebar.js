import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import EcoDropLogoWord from '../assets/images/EcoDropLogoWord.png';

const Sidebar = () => {
  const navigate = useNavigate();
  const location = useLocation();

  const menuItems = [
    { name: "Overview", icon: "📊", path: "/dashboard" },
    { name: "Bin Locator", icon: "📍", path: "/binmap" },
    { name: "Deposit Logs", icon: "📜", path: "/depositlogs" },
    { name: "Partner Management", icon: "🤝", path: "/partners" },
    { name: "Rewards & Vouchers", icon: "🎟️", path: "/rewards" },
    { name: "Threshold Config", icon: "⚙️", path: "/threshold" }
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
              className={location.pathname === item.path ? "active" : ""}
              onClick={() => navigate(item.path)}
              style={{ cursor: 'pointer' }}
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