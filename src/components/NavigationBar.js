import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import '../styles/DashboardPage.css';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  useEffect(function () {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return function () {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function isActive(path) {
    return location.pathname === path ? 'active' : '';
  }

  function handleLogoutClick() {
    localStorage.removeItem('ecodropLoggedIn');
    navigate('/', { replace: true });
  }

  return (
    <header className="dashboard-topbar">
      <div className="brand-logo" onClick={() => navigate('/')}>
        <img src={logoWord} alt="EcoDrop" className="brand-logo-img" />
      </div>

      <nav className="dashboard-nav">
        <button type="button" className={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>
        <button type="button" className={isActive('/binmap')} onClick={() => navigate('/binmap')}>
          Bin Locator
        </button>
        <button type="button" className={isActive('/depositlogs')} onClick={() => navigate('/depositlogs')}>
          Deposit Logs
        </button>
        <button type="button" onClick={() => alert('Help page is not available yet.')}>
          Help
        </button>
      </nav>

      <div className="header-controls">
        <div className="search-bar">
          <input type="text" placeholder="Search transactions, users, bins..." />
        </div>

        <div className="dropdown-wrapper" ref={profileRef}>
          <div
            className="profile-trigger"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span>Admin</span>
            <div className="profile-circle"></div>
          </div>

          {showProfileMenu && (
            <ul className="dropdown-menu">
              <li>
                <button className="dropdown-item" type="button">
                  Settings
                </button>
              </li>
              <li>
                <button className="dropdown-item" type="button">
                  Help Center
                </button>
              </li>
              <li className="menu-divider"></li>
              <li>
                <button className="dropdown-item" type="button">
                  System Health
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item logout-item"
                  type="button"
                  onClick={handleLogoutClick}
                >
                  Logout
                </button>
              </li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;