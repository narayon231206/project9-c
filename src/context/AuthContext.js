'use client';

import React, { createContext, useContext, useEffect, useState } from 'react';
import { authClient } from '../lib/auth-client';
import { toast } from 'react-hot-toast';

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  // 1. Check Session on Mount (Keeps user logged in on page reloads!)
  const checkSession = async () => {
    try {
      setLoading(true);
      const session = await authClient.getSession();
      if (session && session.data && session.data.user) {
        const userObj = session.data.user;
        setUser({
          _id: userObj.id,
          name: userObj.name,
          email: userObj.email,
          photoURL: userObj.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        });
      } else {
        setUser(null);
      }
    } catch (error) {
      setUser(null);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    document.cookie = 'next-auth.session-token=; Max-Age=0; path=/';
    document.cookie = '__Secure-next-auth.session-token=; Max-Age=0; path=/';
    document.cookie = 'next-auth.csrf-token=; Max-Age=0; path=/';
    document.cookie = '__Host-next-auth.csrf-token=; Max-Age=0; path=/';
    checkSession();
  }, []);

  // 2. Register Credentials
  const registerUser = async (name, email, photoURL, password) => {
    try {
      const res = await authClient.signUp.email({
        email,
        password,
        name,
        image: photoURL || undefined,
      });
      if (res && res.data) {
        toast.success('Registration successful! Please login.');
        return { success: true };
      }
      if (res.error) {
        throw new Error(res.error.message || 'Registration failed');
      }
    } catch (error) {
      toast.error(error.message || 'Failed to register');
      return { success: false, error: error.message };
    }
  };

  // 3. Login Credentials
  const loginUser = async (email, password) => {
    try {
      const res = await authClient.signIn.email({
        email,
        password,
      });
      if (res && res.data && res.data.user) {
        const userObj = res.data.user;
        const normalizedUser = {
          _id: userObj.id,
          name: userObj.name,
          email: userObj.email,
          photoURL: userObj.image || 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&q=80&w=200',
        };
        setUser(normalizedUser);
        toast.success(`Welcome back, ${userObj.name}!`);
        return { success: true };
      }
      if (res.error) {
        throw new Error(res.error.message || 'Login failed');
      }
    } catch (error) {
      toast.error(error.message || 'Login failed');
      return { success: false, error: error.message };
    }
  };

  // 4. Google OAuth Sign-in Handler
  const googleLoginUser = async (callbackURL = '/') => {
    try {
      const res = await authClient.signIn.social({
        provider: 'google',
        callbackURL,
      });
      if (res.error) {
        throw new Error(res.error.message || 'Google Sign-in failed');
      }
      return { success: true };
    } catch (error) {
      toast.error(error.message || 'Google Sign-in failed');
      return { success: false, error: error.message };
    }
  };

  // 5. Logout Session
  const logoutUser = async () => {
    try {
      const res = await authClient.signOut();
      if (!res.error) {
        setUser(null);
        toast.success('Logged out successfully');
        return { success: true };
      }
      throw new Error(res.error.message || 'Logout failed');
    } catch (error) {
      toast.error('Logout failed');
      return { success: false };
    }
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        loading,
        isAuthenticated: !!user,
        registerUser,
        loginUser,
        googleLoginUser,
        logoutUser,
        checkSession,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

export default AuthContext;
