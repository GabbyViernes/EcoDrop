import React, { createContext, useState } from 'react';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [isLoggedIn, setIsLoggedIn] = useState(
    localStorage.getItem('ecodropLoggedIn') === 'true'
  );

  const login = () => {
    localStorage.setItem('ecodropLoggedIn', 'true');
    setIsLoggedIn(true);
  };

  const logout = () => {
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

