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
    try {
      const response = await axios.get(`${backend_URL}/user/isProtected`, {
        withCredentials: true,
      });
      if (response.status === 200) {
        setIsAuthenticated(true);
        setUser(response.data.user);
        setIsLoading(false);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        setIsLoading(false);
      }
    } catch (error) {
      console.error("Authentication check failed:", error);
      setIsAuthenticated(false);
      setUser(null);
      setIsLoading(false);
    }
  }, []);

  useEffect(() => {
    checkAuth();
  }, [checkAuth]);

  const login = async (credentials) => {
    setIsLoading(true);
    try {
      const response = await axios.post(`${backend_URL}/user/login`, credentials, {
        withCredentials: true,
      });
      if (response.status === 200) {
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

  const value = {
    isAuthenticated,
    user,
    isLoading,
    login,
    logout,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
};

export default AuthContext;