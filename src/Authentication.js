import React, { createContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(false);
  const [isAuthenticated, setIsAunthenticated] = useState(false);

  const login = () => {
    setUser(true);
    setIsAunthenticated(true);
  };

  const logout = () => {
    setUser(false);
    setIsAunthenticated(false);
  };

  return (
    <AuthContext.Provider value={{ user, login, logout, isAuthenticated }}>
      {children}
    </AuthContext.Provider>
  );
};
