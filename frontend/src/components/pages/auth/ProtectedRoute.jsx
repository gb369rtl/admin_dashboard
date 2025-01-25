// import React from "react";
import { Navigate } from "react-router-dom";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const isAuthenticated = Boolean(localStorage.getItem("authToken")); // Example authentication check
  return isAuthenticated ? children : <Navigate to="/login" />;
};

export default ProtectedRoute;
