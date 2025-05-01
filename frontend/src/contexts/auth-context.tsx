"use client";

import React, { createContext, useContext, useEffect, useState } from "react";
import { api, auth } from "@/lib/api";

// Types
export type User = {
  id: number;
  name: string;
  email: string;
  created_at: string;
  updated_at: string;
};

type AuthContextType = {
  user: User | null;
  isLoading: boolean;
  isAuthenticated: boolean;
  login: (
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  signup: (
    name: string,
    email: string,
    password: string,
  ) => Promise<{ success: boolean; error?: string }>;
  logout: () => void;
  refreshUser: () => Promise<void>;
};

// Create context
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// Provider component
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<User | null>(null);
  const [isLoading, setIsLoading] = useState<boolean>(true);

  // Check if user is authenticated on mount
  useEffect(() => {
    const checkAuth = async () => {
      if (auth.isAuthenticated()) {
        await refreshUser();
      }
      setIsLoading(false);
    };

    checkAuth();
  }, []);

  // Refresh user data
  const refreshUser = async () => {
    try {
      const { data, error } = await api.auth.me();
      if (error || !data) {
        setUser(null);
        return;
      }
      setUser(data);
    } catch (error) {
      console.error("Failed to refresh user:", error);
      setUser(null);
    }
  };

  // Login
  const login = async (email: string, password: string) => {
    try {
      const { data, error } = await api.auth.login({ email, password });

      if (error || !data) {
        return { success: false, error: error || "Login failed" };
      }

      // Save token
      localStorage.setItem("auth_token", data.token);

      // Set user
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Login error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  };

  // Signup
  const signup = async (name: string, email: string, password: string) => {
    try {
      const { data, error } = await api.auth.signup({ name, email, password });

      if (error || !data) {
        return { success: false, error: error || "Signup failed" };
      }

      // Save token
      localStorage.setItem("auth_token", data.token);

      // Set user
      setUser(data.user);

      return { success: true };
    } catch (error) {
      console.error("Signup error:", error);
      return {
        success: false,
        error:
          error instanceof Error
            ? error.message
            : "An unexpected error occurred",
      };
    }
  };

  // Logout
  const logout = () => {
    localStorage.removeItem("auth_token");
    setUser(null);
    window.location.href = "/login";
  };

  // Context value
  const value = {
    user,
    isLoading,
    isAuthenticated: !!user,
    login,
    signup,
    logout,
    refreshUser,
  };

  return <AuthContext.Provider value={value}>{children}</AuthContext.Provider>;
}

// Hook for using the auth context
export function useAuth() {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
