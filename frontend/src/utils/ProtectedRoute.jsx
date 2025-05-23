import React, { useContext, useEffect } from "react";
import { AuthContext } from "../context/AuthContext";
import { Navigate, Outlet, useLocation } from "react-router-dom";

const ProtectedRoute = () => {
  const { isAuthenticated, isLoading, user } = useContext(AuthContext);
  const location = useLocation();

  // Check for demo user in localStorage if not authenticated
  useEffect(() => {
    const isDemoUser = localStorage.getItem("isDemoUser") === "true";
    if (isDemoUser && !isAuthenticated && !isLoading) {
      // Restore demo user session if it exists in localStorage
      const demoUser = {
        name: "Demo User",
        email: "demo@hackfusion.com",
        role: "user",
      };
      // We need to access the AuthContext directly to update it
      const authContext = AuthContext._currentValue;
      if (
        authContext &&
        authContext.setIsAuthenticated &&
        authContext.setUser
      ) {
        authContext.setIsAuthenticated(true);
        authContext.setUser(demoUser);
      }
    }
  }, [isAuthenticated, isLoading]);

  if (isLoading) {
    return (
      <div className="h-screen w-screen flex flex-col items-center justify-center bg-gray-900">
        <div className="w-16 h-16 border-4 border-blue-500 border-t-transparent rounded-full animate-spin mb-4"></div>
        <p className="text-xl text-white">Loading your dashboard...</p>
        <p className="text-sm text-gray-400 mt-2">
          If this takes too long, try refreshing the page
        </p>
      </div>
    );
  }

  // Check if the user is the demo user
  const isDemoUser = user && user.email === "demo@hackfusion.com";

  if (isAuthenticated === true || isDemoUser) {
    return <Outlet />;
  }

  return <Navigate to="/login" state={{ from: location }} replace />;
};

export default ProtectedRoute;