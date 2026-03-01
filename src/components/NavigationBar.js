import React, { useState, useRef, useEffect, useCallback } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import '../styles/DashboardPage.css';

const MOCK_SEARCH_DATA = [
  { type: 'Transaction', label: 'TXN-001', id: 'TXN-001' },
  { type: 'Transaction', label: 'TXN-002', id: 'TXN-002' },
  { type: 'User', label: 'Jasmaine Rosallo', id: 'Jasmaine Rosallo' },
  { type: 'User', label: 'Gabrielle Albert', id: 'Gabrielle Albert' },
  { type: 'Bin', label: 'BIN-001 (Limketkai)', id: 'BIN-001' },
  { type: 'Bin', label: 'BIN-002 (SM Downtown)', id: 'BIN-002' }
];

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();

  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const [displayName, setDisplayName] = useState('Admin');
  const [profileImage, setProfileImage] = useState('');

  const profileRef = useRef(null);
  const searchContainerRef = useRef(null);

  const loadProfileData = useCallback(function () {
    const savedDisplayName =
      localStorage.getItem('ecodropDisplayName') ||
      localStorage.getItem('ecodropUser') ||
      'Admin';

    const savedProfileImage =
      localStorage.getItem('ecodropProfileImage') || '';

    setDisplayName(savedDisplayName);
    setProfileImage(savedProfileImage);
  }, []);

  useEffect(() => {
    function handleClickOutside(event) {
      if (profileRef.current && !profileRef.current.contains(event.target)) {
        setShowProfileMenu(false);
      }

      if (searchContainerRef.current && !searchContainerRef.current.contains(event.target)) {
        setShowSuggestions(false);
      }
    }

    document.addEventListener('mousedown', handleClickOutside);

    return function cleanup() {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);

  useEffect(() => {
    loadProfileData();
  }, [location.pathname, loadProfileData]);

  useEffect(() => {
    function handleProfileUpdate() {
      loadProfileData();
    }

    function handleWindowFocus() {
      loadProfileData();
    }

    window.addEventListener('ecodropProfileUpdated', handleProfileUpdate);
    window.addEventListener('focus', handleWindowFocus);

    return function cleanup() {
      window.removeEventListener('ecodropProfileUpdated', handleProfileUpdate);
      window.removeEventListener('focus', handleWindowFocus);
    };
  }, [loadProfileData]);

  function isActive(path) {
    return location.pathname === path ? 'active' : '';
  }

  function handleLogoutClick() {
    setShowProfileMenu(false);
    setDisplayName('Admin');
    setProfileImage('');
    logout();
    localStorage.removeItem('ecodropUser');
    navigate('/', { replace: true });
  }

  function handleGoToSettings() {
    setShowProfileMenu(false);
    navigate('/settings');
  }

  function handleSearchChange(e) {
    const value = e.target.value;
    setSearchQuery(value);

    if (value.trim()) {
      const filtered = MOCK_SEARCH_DATA.filter(function (item) {
        return item.label.toLowerCase().includes(value.toLowerCase());
      });

      setSuggestions(filtered);
      setShowSuggestions(true);
      setActiveIndex(-1);
    } else {
      setSuggestions([]);
      setShowSuggestions(false);
      setActiveIndex(-1);
    }
  }

  function executeSearch(item) {
    setShowSuggestions(false);

    if (item) {
      setSearchQuery(item.label);

      if (item.type === 'Bin') {
        navigate('/binmap?q=' + encodeURIComponent(item.id));
      } else {
        navigate('/depositlogs?q=' + encodeURIComponent(item.id));
      }

      return;
    }

    if (searchQuery.trim()) {
      navigate('/depositlogs?q=' + encodeURIComponent(searchQuery));
    }
  }

  function handleKeyDown(e) {
    if (!showSuggestions) {
      if (e.key === 'Enter') {
        executeSearch();
      }
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex(function (prev) {
        return prev < suggestions.length - 1 ? prev + 1 : prev;
      });
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex(function (prev) {
        return prev > 0 ? prev - 1 : -1;
      });
    } else if (e.key === 'Enter') {
      e.preventDefault();

      if (activeIndex >= 0) {
        executeSearch(suggestions[activeIndex]);
      } else {
        executeSearch();
      }
    } else if (e.key === 'Escape') {
      setShowSuggestions(false);
    }
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
        <div className="search-bar" ref={searchContainerRef}>
          <input
            type="text"
            placeholder="Search transactions, users, bins..."
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
          />

          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions-dropdown">
              {suggestions.map(function (item, index) {
                return (
                  <li
                    key={item.id}
                    className={`suggestion-item ${index === activeIndex ? 'active' : ''}`}
                    onClick={() => executeSearch(item)}
                    onMouseEnter={() => setActiveIndex(index)}
                  >
                    <span className={`suggestion-type type-${item.type.toLowerCase()}`}>
                      {item.type}
                    </span>
                    <span className="suggestion-separator"> : </span>
                    <span className="suggestion-label">{item.label}</span>
                  </li>
                );
              })}
            </ul>
          )}
        </div>

        <div className="dropdown-wrapper" ref={profileRef}>
          <div
            className="profile-trigger"
            onClick={() => setShowProfileMenu(!showProfileMenu)}
          >
            <span>{displayName}</span>

            <div className="profile-circle">
              {profileImage ? (
                <img
                  src={profileImage}
                  alt="Admin Profile"
                  className="profile-image"
                />
              ) : (
                <span className="profile-initial">
                  {displayName.charAt(0).toUpperCase()}
                </span>
              )}
            </div>
          </div>

          {showProfileMenu && (
            <ul className="dropdown-menu">
              <li>
                <button
                  className="dropdown-item"
                  type="button"
                  onClick={handleGoToSettings}
                >
                  Settings
                </button>
              </li>

              <li className="menu-divider"></li>

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