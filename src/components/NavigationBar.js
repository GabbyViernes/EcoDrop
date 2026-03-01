import React, { useState, useRef, useEffect } from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import '../styles/DashboardPage.css';

// Mock data to simulate a searchable database
const MOCK_SEARCH_DATA = [
  { type: 'Transaction', label: 'TXN-001', id: 'TXN-001' },
  { type: 'Transaction', label: 'TXN-002', id: 'TXN-002' },
  { type: 'User', label: 'Jasmaine Rosallo', id: 'Jasmaine Rosallo' },
  { type: 'User', label: 'Gabrielle Albert', id: 'Gabrielle Albert' },
  { type: 'Bin', label: 'BIN-001 (Limketkai)', id: 'BIN-001' },
  { type: 'Bin', label: 'BIN-002 (SM Downtown)', id: 'BIN-002' },
];

function NavigationBar() {
  const navigate = useNavigate();
  const location = useLocation();
  const { logout } = useAuth();
  
  const [showProfileMenu, setShowProfileMenu] = useState(false);
  const profileRef = useRef(null);
  
  // Search State
  const [searchQuery, setSearchQuery] = useState('');
  const [suggestions, setSuggestions] = useState([]);
  const [showSuggestions, setShowSuggestions] = useState(false);
  const [activeIndex, setActiveIndex] = useState(-1);
  const searchContainerRef = useRef(null);

  const username = localStorage.getItem('ecodropUser') || 'Admin';

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
    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Update URL state if navigating back/forth
  useEffect(() => {
    const params = new URLSearchParams(location.search);
    setSearchQuery(params.get('q') || '');
  }, [location.search]);

  function isActive(path) {
    return location.pathname === path ? 'active' : '';
  }

  function handleLogoutClick() {
    logout();
    localStorage.removeItem('ecodropUser');
    navigate('/', { replace: true });
  }

  function handleSearchChange(e) {
    const val = e.target.value;
    setSearchQuery(val);

    if (val.trim()) {
      const filtered = MOCK_SEARCH_DATA.filter((item) =>
        item.label.toLowerCase().includes(val.toLowerCase())
      );
      setSuggestions(filtered);
      setShowSuggestions(true);
      setActiveIndex(-1); // Reset keyboard focus
    } else {
      setShowSuggestions(false);
    }
  }

  function executeSearch(item) {
    setShowSuggestions(false);
    
    // If a specific suggestion is clicked/selected
    if (item) {
      setSearchQuery(item.label);
      if (item.type === 'Bin') {
        navigate(`/binmap?q=${encodeURIComponent(item.id)}`);
      } else {
        navigate(`/depositlogs?q=${encodeURIComponent(item.id)}`);
      }
    } else {
      // If user just presses enter on what they typed
      if (searchQuery.trim()) {
        navigate(`/depositlogs?q=${encodeURIComponent(searchQuery)}`);
      }
    }
  }

  function handleKeyDown(e) {
    if (!showSuggestions) {
      if (e.key === 'Enter') executeSearch();
      return;
    }

    if (e.key === 'ArrowDown') {
      e.preventDefault();
      setActiveIndex((prev) => (prev < suggestions.length - 1 ? prev + 1 : prev));
    } else if (e.key === 'ArrowUp') {
      e.preventDefault();
      setActiveIndex((prev) => (prev > 0 ? prev - 1 : -1));
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
        <button type="button" className={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>
          Dashboard
        </button>
        <button type="button" className={isActive('/binmap')} onClick={() => navigate('/binmap')}>
          Bin Locator
        </button>
        <button type="button" className={isActive('/depositlogs')} onClick={() => navigate('/depositlogs')}>
          Deposit Logs
        </button>
        <button type="button" className={isActive('/help')} onClick={() => navigate('/help')}>
          Help
        </button>
      </nav>

      <div className="header-controls">
        {/* We use the original search-bar div as the relative container! */}
        <div className="search-bar" ref={searchContainerRef}>
          <input 
            type="text" 
            placeholder="Search transactions, users, bins..." 
            value={searchQuery}
            onChange={handleSearchChange}
            onKeyDown={handleKeyDown}
            onFocus={() => searchQuery.trim() && setShowSuggestions(true)}
          />

          {/* Dropdown List - Now directly inside search-bar */}
          {showSuggestions && suggestions.length > 0 && (
            <ul className="search-suggestions-dropdown">
              {suggestions.map((item, index) => (
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
              ))}
            </ul>
          )}
        </div>

        <div className="dropdown-wrapper" ref={profileRef}>
          <div className="profile-trigger" onClick={() => setShowProfileMenu(!showProfileMenu)}>
            <span>{username}</span>
            <div className="profile-circle"></div>
          </div>

          {showProfileMenu && (
            <ul className="dropdown-menu">
              <li><button className="dropdown-item" type="button" onClick={() => navigate('/settings')}>Settings</button></li>
              <li><button className="dropdown-item" type="button" onClick={() => navigate('/help')}>Help Center</button></li>
              <li className="menu-divider"></li>
              <li><button className="dropdown-item" type="button" onClick={() => navigate('/system-health')}>System Health</button></li>
              <li><button className="dropdown-item logout-item" type="button" onClick={handleLogoutClick}>Logout</button></li>
            </ul>
          )}
        </div>
      </div>
    </header>
  );
}

export default NavigationBar;