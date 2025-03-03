import React, { useContext } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const RedirectIfAuthenticated = ({ children }) => {
  const { isAuthenticated, isLoading } = useContext(AuthContext);
  const location = useLocation();

  if (isLoading) {
    return <div>Loading...</div>;
  }

  if (isAuthenticated === false) {
    return children;
  }

  return <Navigate to="/" state={{ from: location }} replace />;
};

export default RedirectIfAuthenticated;