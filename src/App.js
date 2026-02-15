import React, { useState } from 'react';
import './App.css';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage'; // New Import

function App() {
  const [currentPage, setCurrentPage] = useState('landing');

  const handleLogin = () => setCurrentPage('dashboard');
  const handleAbout = () => setCurrentPage('about');
  const handleBackToLanding = () => setCurrentPage('landing');
  const handleLogout = () => setCurrentPage('landing');

  if (currentPage === 'landing') {
    return <LandingPage onLogin={handleLogin} onAbout={handleAbout} />;
  }

  if (currentPage === 'about') {
    return <AboutPage onBack={handleBackToLanding} />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage />;
  }

  if (currentPage === 'dashboard') {
    return <DashboardPage onLogout={handleLogout} />; 
  }

  return null;
}

export default App;