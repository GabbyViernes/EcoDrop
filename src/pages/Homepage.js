import React from 'react';
import { useNavigate } from 'react-router-dom';
import '../styles/Homepage.css';
import logoWord from '../assets/images/EcoDropLogoWord.png';
import ecodrophomebg from '../assets/images/ecodrophomebg.png';
import Navbar from '../components/Sidebar';

function HomePage() {
  var navigate = useNavigate();
  var isLoggedIn = localStorage.getItem('ecodropLoggedIn') === 'true';

  function handlePrimaryCTA() {
    if (isLoggedIn) {
      navigate('/dashboard');
      return;
    }
    navigate('/landing');
  }

  return (
    <div className="home-page-shell">
      <div className="home-bg-layer">
        <img src={ecodrophomebg} alt="EcoDrop background" className="home-bg-image" />
      </div>

      <Navbar />

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
              onClick={function () {
                navigate('/binmap', { replace: isLoggedIn });
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

        <aside className="hero-glass-card">
          <h3>CONTINUE YOUR ECO JOURNEY!</h3>
          <p>Quick overview of nearby disposal options and your latest activity.</p>

          <div className="mini-panel">
            <div className="mini-row">
              <div>
                <strong>Plastic Mailers</strong>
                <small>Nearest point: 0.8 km</small>
              </div>
              <span className="mini-tag">Open</span>
            </div>

            <div className="mini-row">
              <div>
                <strong>Bubble Wraps</strong>
                <small>Nearest point: 1.1 km</small>
              </div>
              <span className="mini-tag">Open</span>
            </div>

            <div className="mini-row">
              <div>
                <strong>EcoBins</strong>
                <small>eCollection: Saturday | 8:00 AM</small>
              </div>
              <span className="mini-tag">Schedule</span>
            </div>
          </div>

          <div className="mini-stats">
            <div className="mini-stat">
              <div className="num">24</div>
              <div className="lbl">Items Recycled</div>
            </div>
            <div className="mini-stat">
              <div className="num">6</div>
              <div className="lbl">Bins Nearby</div>
            </div>
            <div className="mini-stat">
              <div className="num">12kg</div>
              <div className="lbl">Waste Diverted</div>
            </div>
          </div>
        </aside>
      </main>

      <div className="home-footer-note">© 2026 EcoDrop | Designed & Developed with ♻ for a greener future. All rights reserved.</div>
    </div>
  );
}

export default HomePage;