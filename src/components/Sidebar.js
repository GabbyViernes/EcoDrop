import React from 'react';
import { useNavigate, useLocation } from 'react-router-dom';
import logoWord from '../assets/images/EcoDropLogo.png';
import '../styles/Homepage.css';

function Navbar() {
  const navigate = useNavigate();
  const location = useLocation();
  const isLoggedIn = localStorage.getItem('ecodropLoggedIn') === 'true';

  function isActive(path) {
    return location.pathname === path ? 'active' : '';
  }

  return (
    <header className="home-topbar">
      <div
        className="home-brand-logo"
        onClick={() => navigate('/', { replace: isLoggedIn })}
      >
        <img src={logoWord} alt="EcoDrop" className="home-brand-logo-img" />
      </div>

      <nav className="home-nav">
        <button type="button" className={isActive('/')} onClick={() => navigate('/')}>
          Home
        </button>
        <button type="button" className={isActive('/about')} onClick={() => navigate('/about')}>
          About
        </button>
        <button type="button" className={isActive('/binmap')} onClick={() => navigate('/binmap')}>
          Bin Locator
        </button>
        <button type="button" onClick={() => alert('Help page is not available yet.')}>
          Help
        </button>
        {isLoggedIn && (
          <button type="button" className={isActive('/dashboard')} onClick={() => navigate('/dashboard')}>
            Dashboard
          </button>
        )}
      </nav>

      <div className="home-auth">
        {!isLoggedIn && (
          <>
            <button type="button" className="btn btn-outline" onClick={() => navigate('/landing')}>
              Sign In
            </button>
            <button type="button" className="btn btn-primary" onClick={() => navigate('/signup')}>
              Sign Up
            </button>
          </>
        )}
      </div>
    </header>
  );
}

export default Navbar;