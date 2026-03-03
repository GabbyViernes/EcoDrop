import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import useAuth from '../hooks/useAuth';
import '../styles/Homepage.css';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import ecodrophomebg from '../assets/images/ecodrophomebg.png';

function HomePage() {
  const navigate = useNavigate();
  const { login, isLoggedIn } = useAuth();

  const [activeTab, setActiveTab] = useState('signin');
  const [showTutorial, setShowTutorial] = useState(false);
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

  useEffect(() => {
    const handleScroll = () => {
      const tutorialSteps = document.querySelectorAll('.tutorial-step');
      const tutorialHighlight = document.querySelector('.tutorial-highlight');
      const tutorialSection = document.querySelector('.tutorial-section');

      if (tutorialSection && showTutorial) {
        const rect = tutorialSection.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isInView) {
          tutorialSection.classList.add('fade-in');
        }
      }

      tutorialSteps.forEach(step => {
        const rect = step.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isInView) {
          step.classList.add('fade-in');
        }
      });

      if (tutorialHighlight) {
        const rect = tutorialHighlight.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;
        if (isInView) {
          tutorialHighlight.classList.add('fade-in');
        }
      }
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, [showTutorial]);

  function handlePrimaryCTA() {
    setShowTutorial(!showTutorial);
    if (!showTutorial) {
      setTimeout(() => {
        const tutorialSection = document.querySelector('.tutorial-section');
        if (tutorialSection) {
          tutorialSection.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }, 100);
    }
  }

    function handleLoginSubmit(e) {
      e.preventDefault();
      login();
      setShowSuccessModal(false);
      setActiveTab('signin');
      navigate('/dashboard');
    }

    function handleSignupSubmit(e) {
      e.preventDefault();
      setShowSuccessModal(true);
      setActiveTab('signin');
    }

    function handleModalClose() {
      setShowSuccessModal(false);
      setActiveTab('signin');
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

      {showTutorial && (
      <section className="tutorial-section pop-in">
        <div className="tutorial-container">
          <h1 className="tutorial-title">How to Recycle with EcoDrop</h1>
          
          <div className="tutorial-steps-grid">
            <div className="tutorial-steps-top">
              <div className="tutorial-step">
                <div className="step-badge">Step 1</div>
                <h2>Find Your Bin</h2>
                <p>Locate a nearby <strong>EcoDrop smart bin</strong> using our interactive community map or bin locator feature.</p>
                <div className="step-icon">📍</div>
              </div>

              <div className="tutorial-step">
                <div className="step-badge">Step 2</div>
                <h2>Check & Prepare</h2>
                <p>Ensure your <strong>packaging is clean and dry</strong> – bubble wrap, plastic mailers, and safe materials only.</p>
                <div className="step-icon">✅</div>
              </div>

              <div className="tutorial-step">
                <div className="step-badge">Step 3</div>
                <h2>Scan & Drop</h2>
                <p>Use the bin's <strong>QR code scanner</strong> or smart display to verify, then safely drop your items inside.</p>
                <div className="step-icon">📱</div>
              </div>
            </div>

            <div className="tutorial-steps-bottom" role="group" aria-label="Additional steps">
              <div className="tutorial-step small-step">
                <div className="step-badge">Step 4</div>
                <h2>Get Rewards</h2>
                <p>Our <strong>IoT load cells</strong> verify weight and automatically credit your account with eco-points!</p>
                <div className="step-icon">🎉</div>
              </div>

              <div className="tutorial-step small-step">
                <div className="step-badge">Step 5</div>
                <h2>Track Impact</h2>
                <p>Monitor your <strong>recycling progress</strong> and eco points on your personalized dashboard.</p>
                <div className="step-icon">📊</div>
              </div>
            </div>
          </div>

          <div className="tutorial-highlight">
            <p className="highlight-text">🌱 <strong>Every drop matters!</strong> Together, we're transforming e-commerce waste into sustainability. Start your eco journey today!</p>
          </div>
        </div>
      </section>
      )}

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