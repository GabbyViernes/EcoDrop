import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import ecodrophomebg from '../assets/images/ecodrophomebg.png';

function HomePage() {
  const navigate = useNavigate();
  const isLoggedIn = localStorage.getItem('ecodropLoggedIn') === 'true';

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  function handlePrimaryCTA() {
    if (isLoggedIn) {
      navigate('/dashboard');
      return;
    }
    navigate('/landing');
  }

  function handleLoginSubmit(e) {
    e.preventDefault();
    const username = email.split('@')[0];
    localStorage.setItem('ecodropLoggedIn', 'true');
    localStorage.setItem('ecodropUser', username);
    navigate('/dashboard', { replace: true });
  }

  return (
    <div className="home-page-shell">
      <div className="home-bg-layer">
        <img src={ecodrophomebg} alt="EcoDrop background" className="home-bg-image" />
      </div>

      <main className="home-hero">
        <section className="hero-left">
          <div className="hero-logo-wrap">
            <img src={logoWord} alt="EcoDrop" className="hero-logo-img" />
          </div>

          <p className="hero-subtitle">
            Turn everyday cleanup into impact. Find nearby disposal points, track eco actions,
            and keep your community greener one drop at a time 🌱
          </p>

          <div className="hero-cta-row">
            <button
              type="button"
              className="btn btn-primary btn-lg"
              onClick={handlePrimaryCTA}
            >
              {isLoggedIn ? 'Go to Dashboard' : 'Start Recycling'}
            </button>

            <button
              type="button"
              className="btn btn-soft btn-lg"
              onClick={() => navigate('/binmap', { replace: isLoggedIn })}
            >
              Find Bin Near Me
            </button>
          </div>

          <div className="hero-pill-row">
            <span className="hero-pill">♻ Smart Bin Locator</span>
            <span className="hero-pill">🗺 Community Map</span>
            <span className="hero-pill">📊 Eco Progress</span>
          </div>
        </section>

        <aside className="hero-glass-card">
          <h3>LOGIN TO CONTINUE</h3>

          <form className="home-login-form" onSubmit={handleLoginSubmit}>
            <div className="home-form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="home-form-input"
              />
            </div>

            <div className="home-form-group home-password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="home-form-input"
              />
              <button
                type="button"
                className="home-toggle-password"
                onClick={() => setShowPassword(!showPassword)}
                tabIndex={-1}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <div className="home-form-options">
              <label className="home-remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
              <a href="#forgot" className="home-forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="home-login-submit-btn">
              Sign In
            </button>
          </form>
        </aside>
      </main>

      <div className="home-footer-note">
        © 2026 EcoDrop | Designed &amp; Developed with ♻ for a greener future. All rights reserved.
      </div>

      <button
        type="button"
        className="home-help-fab"
        onClick={() => navigate('/about')}
        title="About EcoDrop"
      >
        ?
      </button>
    </div>
  );
}

export default HomePage;