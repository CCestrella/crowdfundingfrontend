import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("authToken") || null,
    user: null,
  });

  const login = (token, user) => {
    setAuth({ token, user });
    localStorage.setItem("authToken", token);
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("authToken");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
