import React, { createContext, useContext, useState } from "react";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("authToken") || null,
    user: JSON.parse(localStorage.getItem("user")) || null, // Parse the stored user JSON
  });

  const login = (token, user) => {
    setAuth({ token, user });
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user)); // Store user as a JSON string
  };

  const logout = () => {
    setAuth({ token: null, user: null });
    localStorage.removeItem("authToken");
    localStorage.removeItem("user");
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
