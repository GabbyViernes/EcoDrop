import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import '../styles/DashboardPage.css';

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);

  const username = localStorage.getItem('ecodropUser') || 'Admin';

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }
    }
    document.addEventListener('mousedown', handleClickOutside);
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  function isActive(path) {
    return location.pathname === path ? 'active' : '';
  }

  function handleLogoutClick() {
    localStorage.removeItem('ecodropLoggedIn');
    localStorage.removeItem('ecodropUser'); 
    navigate('/', { replace: true });
  }

  return (
    <header className="dashboard-topbar">
      <div className="brand-logo" onClick={() => navigate('/')}>
        <img src={logoWord} alt="EcoDrop" className="brand-logo-img" />
      </div>

      <nav className="dashboard-nav">
        <button
          type="button"
          className={isActive('/dashboard')}
          onClick={() => navigate('/dashboard')}
        >
          Dashboard
        </button>
        <button
          type="button"
          className={isActive('/binmap')}
          onClick={() => navigate('/binmap')}
        >
          Bin Locator
        </button>
        <button
          type="button"
          className={isActive('/depositlogs')}
          onClick={() => navigate('/depositlogs')}
        >
          Deposit Logs
        </button>
        <button
          type="button"
          className={isActive('/help')}
          onClick={() => navigate('/help')}
        >
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
            <span>{username}</span>
            <div className="profile-circle"></div>
          </div>

          {showProfileMenu && (
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => navigate('/settings')}
                >
                  Settings
                </button>
              </li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => navigate('/help')}
                >
                  Help Center
                </button>
              </li>
              <li className="menu-divider"></li>
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={() => navigate('/system-health')}
                >
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
