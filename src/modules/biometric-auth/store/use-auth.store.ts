import { create } from 'zustand';
import { loginWithCredentials, authenticateWithBiometrics, LoginCredentials } from '../services';
import { AuthState } from '../../../shared/types/auth.types';
import * as SecureStore from 'expo-secure-store';

export const useAuthStore = create<AuthState & {
  login: (credentials: LoginCredentials) => Promise<void>;
  loginWithBiometrics: () => Promise<void>;
  logout: () => void;
}>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  biometricEnabled: false,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const result = await loginWithCredentials(credentials);
      if (result.success) {
        set({ isAuthenticated: true, biometricEnabled: true });
        if (result.token) {
          await SecureStore.setItemAsync('authToken', result.token);
        }
        // Store mock credentials securely
        await SecureStore.setItemAsync('userEmail', credentials.email);
        await SecureStore.setItemAsync('userPassword', credentials.password);
      } else {
        set({ error: result.message || 'Login failed' });
      }
    } catch (error) {
      set({ error: 'An error occurred during login' });
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithBiometrics: async () => {
    const { biometricEnabled } = get();
    if (!biometricEnabled) {
      set({ error: 'Biometric authentication not enabled. Please login first.' });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const result = await authenticateWithBiometrics();
      if (result.success) {
        set({ isAuthenticated: true });
        if (result.token) {
          await SecureStore.setItemAsync('authToken', result.token);
        }
      } else {
        set({ error: result.message || 'Biometric authentication failed' });
      }
    } catch (error) {
      set({ error: 'An error occurred during biometric authentication' });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    set({ isAuthenticated: false, error: null });
    await SecureStore.deleteItemAsync('authToken');
  },
}));