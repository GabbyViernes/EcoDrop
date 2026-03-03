import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Homepage.css';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import ecodrophomebg from '../assets/images/ecodrophomebg.png';

function HomePage() {
    // Handler for primary CTA button
    function handlePrimaryCTA() {
      if (isLoggedIn) {
        navigate('/dashboard');
      } else {
        setActiveTab('signin');
      }
    }

    // Handler for login form submit
    function handleLoginSubmit(e) {
      e.preventDefault();
      login();
      setShowSuccessModal(false);
      setActiveTab('signin');
      navigate('/dashboard');
    }

    // Handler for signup form submit
    function handleSignupSubmit(e) {
      e.preventDefault();
      setShowSuccessModal(true);
      setActiveTab('signin');
    }

    // Handler for closing modal
    function handleModalClose() {
      setShowSuccessModal(false);
      setActiveTab('signin');
    }
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [activeTab, setActiveTab] = useState('signin');

  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const [signupFullName, setSignupFullName] = useState('');
  const [signupAdminId, setSignupAdminId] = useState('');
  const [signupEmail, setSignupEmail] = useState('');
  const [signupPassword, setSignupPassword] = useState('');
  const [signupConfirmPassword, setSignupConfirmPassword] = useState('');
  const [showSignupPassword, setShowSignupPassword] = useState(false);
  const [showSignupConfirm, setShowSignupConfirm] = useState(false);

  const [showSuccessModal, setShowSuccessModal] = useState(false);

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
              onClick={() => {
                if (isLoggedIn) {
                  navigate('/binmap');
                } else {
                  alert('Please sign in to locate bins near you!');
                  const emailInput = document.querySelector('input[type="email"]');
                  if(emailInput) emailInput.focus();
                }
               }}
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

        <div className="hero-right-wrapper">
          <div className="home-tab-row">
            <button
              type="button"
              className={`home-tab-btn ${activeTab === 'signin' ? 'home-tab-active' : ''}`}
              onClick={() => setActiveTab('signin')}
            >
              Sign In
            </button>
            <span className="home-tab-divider">|</span>
            <button
              type="button"
              className={`home-tab-btn ${activeTab === 'signup' ? 'home-tab-active' : ''}`}
              onClick={() => setActiveTab('signup')}
            >
              Sign Up
            </button>
          </div>

          <aside className="hero-glass-card">
            {activeTab === 'signin' && (
              <>
                <p>Welcome back, continue your EcoDrop journey.</p>
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
              </>
            )}
            {activeTab === 'signup' && (
              <>
                <p>Join EcoDrop and start making an impact today.</p>
                <form className="home-login-form" onSubmit={handleSignupSubmit}>
                  <div className="home-form-group">
                    <input
                      type="text"
                      placeholder="Full Name"
                      value={signupFullName}
                      onChange={(e) => setSignupFullName(e.target.value)}
                      required
                      className="home-form-input"
                    />
                  </div>
                  <div className="home-form-group">
                    <input
                      type="text"
                      placeholder="Admin ID"
                      value={signupAdminId}
                      onChange={(e) => setSignupAdminId(e.target.value)}
                      required
                      className="home-form-input"
                    />
                  </div>
                  <div className="home-form-group">
                    <input
                      type="email"
                      placeholder="Email"
                      value={signupEmail}
                      onChange={(e) => setSignupEmail(e.target.value)}
                      required
                      className="home-form-input"
                    />
                  </div>
                  <div className="home-form-group home-password-group">
                    <input
                      type={showSignupPassword ? 'text' : 'password'}
                      placeholder="Password"
                      value={signupPassword}
                      onChange={(e) => setSignupPassword(e.target.value)}
                      required
                      className="home-form-input"
                    />
                    <button
                      type="button"
                      className="home-toggle-password"
                      onClick={() => setShowSignupPassword(!showSignupPassword)}
                      tabIndex={-1}
                    >
                      {showSignupPassword ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  <div className="home-form-group home-password-group">
                    <input
                      type={showSignupConfirm ? 'text' : 'password'}
                      placeholder="Confirm Password"
                      value={signupConfirmPassword}
                      onChange={(e) => setSignupConfirmPassword(e.target.value)}
                      required
                      className="home-form-input"
                    />
                    <button
                      type="button"
                      className="home-toggle-password"
                      onClick={() => setShowSignupConfirm(!showSignupConfirm)}
                      tabIndex={-1}
                    >
                      {showSignupConfirm ? '👁️' : '👁️‍🗨️'}
                    </button>
                  </div>
                  <button type="submit" className="home-login-submit-btn">
                    Create Account
                  </button>
                </form>
              </>
            )}
          </aside>
        </div>
      </main>

      <div className="home-footer-note">
        © 2026 EcoDrop | Designed & Developed with ♻ for a greener future. All rights reserved.
      </div>

      <button
        type="button"
        className="home-help-fab"
        onClick={() => navigate('/about')}
        title="About EcoDrop"
      >
        ?
      </button>

      {showSuccessModal && (
        <div className="home-modal-overlay" onClick={handleModalClose}>
          <div
            className="home-modal-card"
            onClick={(e) => e.stopPropagation()}
          >
            <div className="home-modal-icon">✅</div>
            <h3 className="home-modal-title">Account Created!</h3>
            <p className="home-modal-body">
              Welcome to EcoDrop, <strong>{signupFullName || 'Eco Hero'}</strong>!
              Your account has been successfully created. You can now sign in.
            </p>
            <button
              type="button"
              className="home-modal-confirm-btn"
              onClick={handleModalClose}
            >
              Go to Sign In
            </button>
          </div>
        </div>
      )}
    </div>
  );
}

export default HomePage;