import { useState, useEffect } from 'react';
import { Alert } from 'react-native';
import AsyncStorage from '@react-native-async-storage/async-storage';
import { router } from 'expo-router';

import authService from '../services/AuthService';

const useAuth = () => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const checkUser = async () => {
      try {
        const { user: authenticatedUser } = await authService.getAuthenticatedUser();
        if (authenticatedUser) {
          setUser(authenticatedUser);
        }
      } catch (error) {
        console.error('Failed to check user status:', error);
      } finally {
        setLoading(false);
      }
    };
    checkUser();
  }, []);

  const login = async (email, password) => {
    if (!email || !password) {
          Alert.alert('Login Failed', 'Please enter both email and password.');
          return false;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Alert.alert('Login Failed', 'Please enter a valid email address.');
          return false;
        }
    
    setLoading(true);
    try {
      const { success, user: loggedInUser } = await authService.login(email, password);
      if (success) {
        setUser(loggedInUser);
        console.log(user.email)
      }
      return success;
    } finally {
      setLoading(false);
    }
  };

  const register = async (email, password) => {
     if (!email || !password || !confirmPassword) {
          Alert.alert('Registration Failed', 'Please fill in all fields.');
          return false;
        }
    
        if (password !== confirmPassword) {
          Alert.alert('Registration Failed', 'Passwords do not match.');
          return false;
        }
    
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailRegex.test(email)) {
          Alert.alert('Registration Failed', 'Please enter a valid email address.');
          return false;
        }

    setLoading(true);
    try {
      const { success, user: newUser } = await authService.register(email, password);
      if (success) {
        setUser(newUser);
        console.log('Register')
        console.log(user.email)
      }
      return success;
    } finally {
      setLoading(false);
    }
  };

  const logout = async () => {
    setLoading(true);
    try {
      await authService.logout();
      setUser(null);
      router.replace('/');
    } finally {
      setLoading(false);
    }
  };

  return {
    user,
    loading,
    login,
    register,
    logout,
  };
};

export default useAuth;
