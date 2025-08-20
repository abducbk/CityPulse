import AsyncStorage from '@react-native-async-storage/async-storage';
import { Alert } from 'react-native';

const USERS_STORAGE_KEY = '@users';
const AUTH_TOKEN_KEY = '@auth_token';

async function register(email, password) {
  try {
    const usersJSON = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const users = usersJSON ? JSON.parse(usersJSON) : {};

    if (users[email]) {
      Alert.alert('Registration Failed', 'An account with this email already exists.');
      return { success: false };
    }
    const newUser = { email, password };
    users[email] = newUser;
    await AsyncStorage.setItem(USERS_STORAGE_KEY, JSON.stringify(users));

    Alert.alert('Success', 'Account created successfully!');
    return { success: true, user: newUser };
  } catch (error) {
    console.error('Registration failed:', error);
    Alert.alert('Registration Failed', 'An error occurred during registration. Please try again.');
    throw error;
  }
}

async function login(email, password) {
  try {
    const usersJSON = await AsyncStorage.getItem(USERS_STORAGE_KEY);
    const users = usersJSON ? JSON.parse(usersJSON) : {};

    const user = users[email];
    if (!user || user.password !== password) {
      Alert.alert('Login Failed', 'Invalid email or password.');
      return { success: false };
    }

    const token = `mock-token-${email}`;
    await AsyncStorage.setItem(AUTH_TOKEN_KEY, token);

    Alert.alert('Success', 'Logged in successfully!');
    return { success: true, user };
  } catch (error) {
    console.error('Login failed:', error);
    Alert.alert('Login Failed', 'An error occurred during login. Please try again.');
    throw error;
  }
}

async function logout() {
  try {
    await AsyncStorage.removeItem(AUTH_TOKEN_KEY);
    Alert.alert('Logout', 'Logged out successfully!');
  } catch (error) {
    console.error('Logout failed:', error);
    Alert.alert('Logout Failed', 'An error occurred during logout.');
  }
}

async function getAuthenticatedUser() {
  try {
    const token = await AsyncStorage.getItem(AUTH_TOKEN_KEY);
    if (token) {
      const email = token.replace('mock-token-', '');
      const usersJSON = await AsyncStorage.getItem(USERS_STORAGE_KEY);
      const users = usersJSON ? JSON.parse(usersJSON) : {};
      const user = users[email];
      return { user };
    }
  } catch (error) {
    console.error('Failed to get authenticated user:', error);
  }
  return { user: null };
}

export default { register, login, logout, getAuthenticatedUser };
