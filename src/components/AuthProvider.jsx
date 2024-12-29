import React, { createContext, useContext, useState, useEffect } from "react"; // Added useEffect import

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [auth, setAuth] = useState({
    token: localStorage.getItem("authToken") || null,
    user: JSON.parse(localStorage.getItem("user")) || null,
  });

  useEffect(() => {
    const token = localStorage.getItem("authToken");
    const user = JSON.parse(localStorage.getItem("user"));
    console.log("Restoring from localStorage:", { token, user }); // Debugging
    if (token && user) {
      setAuth({ token, user });
    }
  }, []);
  

  const login = (token, user) => {
    setAuth({ token, user });
    localStorage.setItem("authToken", token);
    localStorage.setItem("user", JSON.stringify(user));
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
