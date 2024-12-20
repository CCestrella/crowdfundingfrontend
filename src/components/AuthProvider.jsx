import React, { createContext, useState } from "react";

// Create the AuthContext
export const AuthContext = createContext();

// AuthProvider Component
export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState(() => {
    const token = localStorage.getItem("authToken");
    const firstName = localStorage.getItem("firstName") || "User";
    return { token, firstName };
  });

  const logout = () => {
    localStorage.removeItem("authToken");
    localStorage.removeItem("firstName");
    setAuth({ token: null, firstName: null });
  };

  return (
    <AuthContext.Provider value={{ auth, setAuth, logout }}>
      {children}
    </AuthContext.Provider>
  );
};
