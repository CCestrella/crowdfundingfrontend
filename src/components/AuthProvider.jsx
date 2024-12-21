import React, { createContext, useState, useContext } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: null,
    user: null,
  });

  const login = (user, token) => {
    setAuth({ user, token });
    localStorage.setItem("token", token);
  };

  const logout = () => {
    setAuth({ user: null, token: null });
    localStorage.removeItem("token");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
};
