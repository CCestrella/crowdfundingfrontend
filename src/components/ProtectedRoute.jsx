import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/use-auth";

const ProtectedRoute = ({ children }) => {
  const { auth } = useAuth();

  if (!auth.token) {
    // Redirect to login page if not authenticated
    return <Navigate to="/login" />;
  }

  return children;
};

export default ProtectedRoute;