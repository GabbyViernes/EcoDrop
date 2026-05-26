import React, { createContext, useState } from 'react';
import { API_BASE_URL } from '../api/config';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('ecodropLoggedIn') === 'true'
  );

  const login = async (username, password) => {
    try {
      const response = await fetch(`${API_BASE_URL}/login/`, {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ username, password })
      });

      if (!response.ok) {
        const errorData = await response.json().catch(() => ({}));
        console.error("Login failed response:", errorData);
        throw new Error('Login failed');
      }

      const data = await response.json();
      
      // Save the real Django token
      localStorage.setItem('ecodropToken', data.token);
      localStorage.setItem('ecodropLoggedIn', 'true');
      setIsLoggedIn(true);
      return true;
    } catch (error) {
      console.error("Authentication error:", error);
      return false;
    }
  };

  const logout = () => {
    localStorage.removeItem('ecodropToken'); // Clear the token on logout
    localStorage.removeItem('ecodropLoggedIn');
    localStorage.removeItem('ecodropUser');
    localStorage.removeItem('ecodropDisplayName');
    setIsLoggedIn(false);
  };

  return (
    <AuthContext.Provider value={{ isLoggedIn, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};