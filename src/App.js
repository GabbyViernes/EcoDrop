import React, { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import BinMapPage from './pages/BinMapPage';

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogin = () => setCurrentPage('dashboard');
  const handleAbout = () => setCurrentPage('about');
  const handleBackToLanding = () => setCurrentPage('landing');
  const handleLogout = () => setCurrentPage('landing');

  const handleNavigate = (tabName) => {
    if (tabName === 'Bin Locator') setCurrentPage('binmap');
    if (tabName === 'Overview') setCurrentPage('dashboard');

  };

  if (currentPage === 'landing') {
    return <LandingPage onLogin={handleLogin} onAbout={handleAbout} />;
  }

  if (currentPage === 'about') {
    return <AboutPage onBack={handleBackToLanding} />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage onLogout={handleLogout} onNavigate={handleNavigate} />;
  }

  if (currentPage === 'binmap') {
    return <BinMapPage onLogout={handleLogout} onNavigate={handleNavigate} />;
  }

  return null;
}

export default App;