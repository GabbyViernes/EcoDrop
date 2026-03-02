import React from 'react';
import { BrowserRouter as Router, Routes, Route, Navigate } from 'react-router-dom';
import './App.css';
import Homepage from './pages/Homepage';
import AboutPage from './pages/AboutPage';
import DashboardPage from './pages/DashboardPage';
import BinMapPage from './pages/BinMapPage';
import DepositLogsPage from './pages/DepositLogsPage';
import SignupPage from './pages/SignupPage';
import HelpPage from './pages/HelpPage';
import SettingsPage from './pages/SettingsPage';
import { AuthProvider, useAuth } from './context/AuthContext';
import { BinProvider } from './context/BinContext'; // <-- ADDED THIS

function ProtectedRoute({ children }) {
  const { isLoggedIn } = useAuth();
  return isLoggedIn ? children : <Navigate to="/" replace />;
}

function App() {
  return (
    <AuthProvider>
      <BinProvider> {/* <-- WRAPPED ROUTER WITH THIS */}
        <Router>
          <Routes>
            <Route path="/" element={<Homepage />} />
            <Route path="/signup" element={<SignupPage />} />
            <Route path="/about" element={<AboutPage />} />
            <Route path="/help" element={<HelpPage />} />

            <Route path="/binmap" element={<BinMapPage />} />

            <Route path="/dashboard" element={<ProtectedRoute><DashboardPage /></ProtectedRoute>} />
            <Route path="/depositlogs" element={<ProtectedRoute><DepositLogsPage /></ProtectedRoute>} />
            <Route path="/settings" element={<ProtectedRoute><SettingsPage /></ProtectedRoute>} />

            <Route path="*" element={<Navigate to="/" replace />} />
          </Routes>
        </Router>
      </BinProvider>
    </AuthProvider>
  );
}

export default App;