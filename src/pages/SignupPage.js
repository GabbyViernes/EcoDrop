import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/SignupPage.css';
import backgroundImage from '../assets/images/EcoDrop-WebBG.png';
import logoWord from '../assets/images/EcoDropLogoWord.png';

function SignupPage() {
  const navigate = useNavigate();

  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  const [fullName, setFullName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSignupSubmit = function (e) {
  e.preventDefault();

  if (password !== confirmPassword) {
    alert('Passwords do not match.');
    return;
  }

  alert('Account created successfully! You can now log in.');
  navigate('/landing');
};

  return (
    <div
      className="signup-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <div className="signup-topbar">
        <img
          src={logoWord}
          alt="EcoDrop Logo"
          className="signup-topbar-logo"
          onClick={function () { navigate('/'); }}
        />
        <div className="signup-nav-actions">
          <button
            className="signup-nav-btn ghost"
            type="button"
            onClick={function () { navigate('/'); }}
          >
            Home
          </button>
          <button
            className="signup-nav-btn"
            type="button"
            onClick={function () { navigate('/landing'); }}
          >
            Log In
          </button>
        </div>
      </div>

      <div className="signup-layout">
        <div className="signup-left">
          <div className="signup-copy-card">
            <h1>Create your EcoDrop account</h1>
            <p>
              Join the green side. Track your recycling impact, find nearby bins,
              and build cleaner habits with your community.
            </p>

            <div className="signup-pill-row">
              <span className="signup-pill">♻ Track progress</span>
              <span className="signup-pill">🗺 Find bins</span>
              <span className="signup-pill">🌱 Build habits</span>
            </div>
          </div>
        </div>

        <div className="signup-right">
          <form className="signup-form-card" onSubmit={handleSignupSubmit}>
            <h2>Sign up</h2>
            <p className="signup-form-subtitle">Create your account to get started</p>

            <div className="signup-form-group">
              <input
                type="text"
                className="signup-input"
                placeholder="Full Name"
                value={fullName}
                onChange={function (e) { setFullName(e.target.value); }}
                required
              />
            </div>

            <div className="signup-form-group">
              <input
                type="email"
                className="signup-input"
                placeholder="Email"
                value={email}
                onChange={function (e) { setEmail(e.target.value); }}
                required
              />
            </div>

            <div className="signup-form-group password-wrap">
              <input
                type={showPassword ? 'text' : 'password'}
                className="signup-input"
                placeholder="Password"
                value={password}
                onChange={function (e) { setPassword(e.target.value); }}
                required
              />
              <button
                type="button"
                className="signup-eye-btn"
                onClick={function () { setShowPassword(!showPassword); }}
              >
                {showPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <div className="signup-form-group password-wrap">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                className="signup-input"
                placeholder="Confirm Password"
                value={confirmPassword}
                onChange={function (e) { setConfirmPassword(e.target.value); }}
                required
              />
              <button
                type="button"
                className="signup-eye-btn"
                onClick={function () { setShowConfirmPassword(!showConfirmPassword); }}
              >
                {showConfirmPassword ? '👁️' : '👁️‍🗨️'}
              </button>
            </div>

            <button type="submit" className="signup-submit-btn">
              Create Account
            </button>

            <div className="signup-switch-row">
              <span>Already have an account?</span>
              <button
                type="button"
                className="signup-switch-btn"
                onClick={function () { navigate('/landing'); }}
              >
                Log in
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}

export default SignupPage;