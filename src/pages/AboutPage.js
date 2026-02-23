import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/AboutPage.css';
import backgroundImage from '../assets/images/EcoDrop-AboutBG.png';
import Navbar from '../components/Sidebar';

function AboutPage() {
  const navigate = useNavigate();

  useEffect(() => {
    const handleScroll = () => {
      const cards = document.querySelectorAll('.info-card, .about-logo, .about-hero, .cta-section');

      cards.forEach(card => {
        const rect = card.getBoundingClientRect();
        const isInView = rect.top < window.innerHeight * 0.8 && rect.bottom > 0;

        if (isInView) {
          card.classList.add('fade-in');
        } else {
          card.classList.remove('fade-in');
        }
      });
    };

    window.addEventListener('scroll', handleScroll);
    handleScroll();

    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <div
      className="about-page"
      style={{ backgroundImage: `url(${backgroundImage})` }}
    >
      <Navbar />

      <div className="about-container">
        <div className="about-hero">
          <h1 className="about-title">About EcoDrop</h1>
          <p className="about-tagline">
            IoT-Powered E-Commerce Packaging Reward System
          </p>
        </div>

        <div className="content-grid">
          <div className="info-card problem-card">
            <div className="card-icon">🌍</div>
            <h2>The Problem</h2>
            <p>
              Plastic mailers and bubble wrap from e-commerce deliveries are often
              non-recyclable via standard bins and end up in Philippine landfills.
              There is no incentivized system for consumers to return this specific
              type of plastic waste.
            </p>
          </div>

          <div className="info-card solution-card">
            <div className="card-icon">💡</div>
            <h2>Our Solution</h2>
            <p>
              EcoDrop provides smart drop boxes equipped with IoT technology to verify
              deposits and reward users for returning e-commerce packaging waste.
              Earn points for every plastic you recycle!
            </p>
          </div>

          <div className="info-card users-card">
            <div className="card-icon">👥</div>
            <h2>Who We Serve</h2>
            <ul>
              <li><strong>E-commerce Shoppers</strong>, earn rewards for recycling. <strong>Recycling Partners</strong>, monitor and manage drop-off locations. <strong>Partner Merchant Stores</strong>, support sustainability initiatives.</li>
            </ul>
          </div>

          <div className="info-card steps-card full-width">
            <h2>How It Works</h2>
            <div className="steps-container">
              <div className="step">
                <div className="step-number">1</div>
                <h3>Scan QR Code</h3>
                <p>Use the mobile app to scan the bin's QR code.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <div className="step-number">2</div>
                <h3>Drop Plastic</h3>
                <p>Deposit your e-commerce packaging.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <div className="step-number">3</div>
                <h3>Get Verified</h3>
                <p>Load cell measures the weight.</p>
              </div>
              <div className="step-arrow">→</div>
              <div className="step">
                <div className="step-number">4</div>
                <h3>Earn Rewards</h3>
                <p>Points are credited to your account.</p>
              </div>
            </div>
          </div>

          <div className="info-card impact-card full-width">
            <h2>Our Environmental Impact</h2>
            <div className="impact-stats">
              <div className="stat">
                <div className="stat-icon">♻️</div>
                <h3>Plastic Diverted</h3>
                <p>From landfills to proper recycling facilities.</p>
              </div>
              <div className="stat">
                <div className="stat-icon">📍</div>
                <h3>Strategic Locations</h3>
                <p>Drop boxes in malls and commercial centers.</p>
              </div>
              <div className="stat">
                <div className="stat-icon">🎁</div>
                <h3>Reward System</h3>
                <p>Incentivizing sustainable behavior.</p>
              </div>
            </div>
          </div>
        </div>

        <div className="cta-section">
          <h2>Join the Movement</h2>
          <p>Be part of the solution. Start recycling your e-commerce packaging today!</p>
          <button className="cta-button" onClick={() => navigate('/')}>
            Get Started
          </button>
        </div>
      </div>
    </div>
  );
}

export default AboutPage;