import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import LandingPage from './pages/LandingPage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import BinMapPage from './pages/BinMapPage';
import DepositLogsPage from './pages/DepositLogsPage';
import SignupPage from './pages/SignupPage';
<<<<<<< HEAD
import HelpPage from './pages/HelpPage';  
=======
import HelpPage from './pages/HelpPage'; 
>>>>>>> d064b8e5e988aa022e24c04bcfda8295552cda57

function ProtectedRoute(props) {
  const isLoggedIn = localStorage.getItem('ecodropLoggedIn') === 'true';
  return isLoggedIn ? props.children : <Navigate to="/landing" replace />;
}

function App() {
  return (
    <Router>
      <Routes>
        <Route path="/" element={<Homepage />} />
        <Route path="/landing" element={<LandingPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/about" element={<AboutPage />} />
<<<<<<< HEAD
        <Route path="/binmap" element={<BinMapPage />} />
        <Route path="/help" element={<HelpPage />} />
        {/* Protected routes */}
=======
        <Route path="/help" element={<HelpPage />} /> 

>>>>>>> d064b8e5e988aa022e24c04bcfda8295552cda57
        <Route
          path="/dashboard"
          element={
            <ProtectedRoute>
              <DashboardPage />
            </ProtectedRoute>
          }
        />
        
        <Route
          path="/binmap"
          element={
            <ProtectedRoute>
              <BinMapPage />
            </ProtectedRoute>
          }
        />

        <Route
          path="/depositlogs"
          element={
            <ProtectedRoute>
              <DepositLogsPage />
            </ProtectedRoute>
          }
        />

        <Route path="*" element={<Navigate to="/" replace />} />
      </Routes>
    </Router>
  );
}

export default App;
