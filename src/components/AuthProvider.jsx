import { createContext, useState, useEffect } from "react";

// Here we create the Context
export const AuthContext = createContext();

// Here we create the component that will wrap our app, this means all its children can access the context using our hook.
export const AuthProvider = (props) => {
  // Initialize state from localStorage, including both token and firstName
  const [auth, setAuth] = useState({
    token: window.localStorage.getItem("token"),
    firstName: window.localStorage.getItem("firstName"),  // Add firstName to the state
  });

  // Whenever the auth state changes, save it to localStorage
  useEffect(() => {
    if (auth.token) {
      window.localStorage.setItem("token", auth.token);
      window.localStorage.setItem("firstName", auth.firstName);  // Save firstName to localStorage as well
    } else {
      window.localStorage.removeItem("token");
      window.localStorage.removeItem("firstName");
    }
  }, [auth]);

  return (
    <AuthContext.Provider value={{ auth, setAuth }}>
      {props.children}
    </AuthContext.Provider>
  );
};
