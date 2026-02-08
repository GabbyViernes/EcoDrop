import React, { useState } from 'react';
import './LandingPage.css';
import backgroundImage from './assets/images/EcoDrop-WebBG.png';
import logoWord from './assets/images/EcoDropLogoWord.png';

function LandingPage({ onLogin, onAbout }) {
  const [showLoginForm, setShowLoginForm] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [rememberMe, setRememberMe] = useState(false);

  const handleLoginClick = () => {
    setShowLoginForm(true);
  };

  const handleLoginSubmit = (e) => {
    e.preventDefault();
    // For now, just redirect to dashboard
    onLogin();
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
              Log In
            </button>
            <button className="landing-btn" onClick={onAbout}>
              About
            </button>
          </div>
        ) : (
          <form className="login-form" onSubmit={handleLoginSubmit}>
            <div className="form-group">
              <input
                type="email"
                placeholder="Email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                required
                className="form-input"
              />
            </div>
            
            <div className="form-group password-group">
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Password"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                required
                className="form-input"
              />
              <button
                type="button"
                className="toggle-password"
                onClick={() => setShowPassword(!showPassword)}
              >
                {showPassword ? "👁️" : "👁️‍🗨️"}
              </button>
            </div>

            <div className="form-options">
              <label className="remember-me">
                <input
                  type="checkbox"
                  checked={rememberMe}
                  onChange={(e) => setRememberMe(e.target.checked)}
                />
                <span>Remember Me</span>
              </label>
              <a href="#forgot" className="forgot-password">Forgot Password?</a>
            </div>

            <button type="submit" className="login-submit-btn">
              Log In
            </button>
          </form>
        )}
      </div>
    </div>
  );
}

export default LandingPage;