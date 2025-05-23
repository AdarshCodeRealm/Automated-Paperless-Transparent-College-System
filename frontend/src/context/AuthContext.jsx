import React, { createContext, useState, useEffect, useCallback } from "react";
import { backend_URL } from "@/utils/constant";
import axios from "axios";

export const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);
  const [user, setUser] = useState(null);
  const [isLoading, setIsLoading] = useState(true);

  const checkAuth = useCallback(async () => {
    setIsLoading(true);
    console.log("AuthProvider rendered")
    
    // Check if we have a demo user in localStorage first
    const isDemoUser = localStorage.getItem("isDemoUser") === "true";
    if (isDemoUser) {
      setIsAuthenticated(true);
      setUser({
        name: "Demo User",
        email: "demo@hackfusion.com",
        role: "user"
      });
      setIsLoading(false);
      return; // Skip backend check for demo users
    }
    
    try {
      // Add timeout to prevent indefinite loading
      const controller = new AbortController();
      const timeoutId = setTimeout(() => controller.abort(), 10000); // 10 second timeout
      
      const response = await axios.get(`${backend_URL}/user/isProtected`, {
        withCredentials: true,
        signal: controller.signal
      });
      
      clearTimeout(timeoutId);
      
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
      } else {
        setIsAuthenticated(false);
        setUser(null);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false); // Always set loading to false regardless of outcome
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    setIsLoading(true);
    
    // Check if this is a demo login request
    if (credentials.email === "demo@hackfusion.com" && credentials.password === "demopassword") {
      // Create a demo user without contacting the backend
      localStorage.setItem("isDemoUser", "true");
      setTimeout(() => {
        setIsAuthenticated(true);
        setUser({
          name: "Demo User",
          email: "demo@hackfusion.com",
          role: "user"
        });
        setIsLoading(false);
      }, 1000); // Small delay for a smoother experience
      return;
    }
    
    // Regular login flow
    try {
      const response = await axios.post(`${backend_URL}/user/login`, credentials, {
        withCredentials: true,
      });
      if (response.status === 200) {
        localStorage.removeItem("isDemoUser"); // Clear any demo user flag
        setIsAuthenticated(true);
        setUser(response.data.user);
      }
    } catch (error) {
      console.error("Login failed:", error);
      setIsAuthenticated(false);
      setUser(null);
    } finally {
      setIsLoading(false);
    }
  };

  const logout = async () => {
    setIsLoading(true);
    
    // Check if this is a demo user logout
    if (user && user.email === "demo@hackfusion.com") {
      localStorage.removeItem("isDemoUser");
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
      return;
    }
    
    // Regular logout flow
    try {
      await axios.post(`${backend_URL}/user/logout`, null, {
        withCredentials: true,
      });
      setIsAuthenticated(false);
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Make these functions available directly on the context
  AuthContext._currentValue = {
    setIsAuthenticated,
    setUser
  };

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
    setIsAuthenticated,
    setUser
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;