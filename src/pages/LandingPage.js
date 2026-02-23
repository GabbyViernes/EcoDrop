import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/LandingPage.css';
import backgroundImage from '../assets/images/EcoDrop-WebBG.png';
import logoWord from '../assets/images/EcoDropLogoWord.png';

function LandingPage() {
  const navigate = useNavigate();
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginClick = function () {
    setShowLoginForm(true);
  };

  const handleCloseForm = function () {
    setShowLoginForm(false);
    setEmail('');
    setPassword('');
    setShowPassword(false);
    setRememberMe(false);
  };

const handleLoginSubmit = function (e) {
  e.preventDefault();

  localStorage.setItem('ecodropLoggedIn', 'true');

  navigate('/dashboard', { replace: true });
};

  return (
    <div
      className="landing-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="landing-content">
        <img src={logoWord} alt="EcoDrop Logo" className="logo-word" />

        {!showLoginForm ? (
          <div className="button-group">
            <button className="landing-btn" onClick={handleLoginClick}>
              Sign In
            </button>
            <button
              className="landing-btn secondary"
              onClick={function () { navigate('/signup'); }}
            >
              Sign Up
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <button
              type="button"
              className="close-form-btn"
              onClick={handleCloseForm}
              title="Close login form"
            >
              ×
            </button>

            <p className="form-subtitle solo">
              Log in to continue your EcoDrop journey.
            </p>

            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={function (e) { setEmail(e.target.value); }}
                required
                className="form-input"
              />
            </div>

            <div className="form-group password-group">
              <input
                type={showPassword ? 'text' : 'password'}
                placeholder="Password"
                value={password}
                onChange={function (e) { setPassword(e.target.value); }}
                required
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={function () { setShowPassword(!showPassword); }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={function (e) { setRememberMe(e.target.checked); }}
                />
                <span>Remember Me</span>
              </label>

              <a href="#forgot" className="forgot-password">
                Forgot Password?
              </a>
            </div>

            <button type="submit" className="login-submit-btn">
              Sign In
            </button>

            <div className="switch-auth-row">
              <span>Don&apos;t have an account?</span>
              <button
                type="button"
                className="switch-auth-btn"
                onClick={function () { navigate('/signup'); }}
              >
                Sign up
              </button>
            </div>
          </form>
        )}
      </div>
    </div>
  );
}

export default LandingPage;