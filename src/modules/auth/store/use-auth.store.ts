import { create } from "zustand";
import {
  loginWithCredentials,
  authenticateWithBiometrics,
  LoginCredentials,
  UserService,
} from "../services";
import { AuthState } from "../../../shared/types/auth.types";
import * as SecureStore from "expo-secure-store";
import { OrderService } from "../../orders/services";

const getCartStore = () => {
  const { useCartStore } = require("../../cart/store");
  return useCartStore;
};

export const useAuthStore = create<
  AuthState & {
    login: (credentials: LoginCredentials) => Promise<void>;
    loginWithBiometrics: () => Promise<void>;
    logout: () => Promise<void>;
    restoreSession: () => Promise<void>;
  }
>((set, get) => ({
  isAuthenticated: false,
  isLoading: false,
  error: null,
  biometricEnabled: false,
  user: null,

  login: async (credentials) => {
    set({ isLoading: true, error: null });
    try {
      const result = await loginWithCredentials(credentials);
      
      if (result.success && result.user) {
        set({ 
          isAuthenticated: true, 
          biometricEnabled: true,
          user: {
            email: result.user.email,
            fullName: result.user.fullName,
          }
        });
        
        if (result.token) {
          await SecureStore.setItemAsync("authToken", result.token);
        }
        
        await SecureStore.setItemAsync("userEmail", credentials.email);
        await SecureStore.setItemAsync("userPassword", credentials.password);
        
        OrderService.setCurrentUser(result.user.email);
        
        const cartStore = getCartStore().getState();
        await cartStore.loadCart(result.user.email);
      } else {
        set({ error: result.message || "Login failed" });
      }
    } catch (error) {
      set({ error: "An error occurred during login" });
    } finally {
      set({ isLoading: false });
    }
  },

  loginWithBiometrics: async () => {
    const { biometricEnabled } = get();
    if (!biometricEnabled) {
      set({
        error: "Biometric authentication not enabled. Please login first.",
      });
      return;
    }

    set({ isLoading: true, error: null });
    try {
      const result = await authenticateWithBiometrics();
      if (result.success) {
        const userEmail = await SecureStore.getItemAsync("userEmail");
        if (userEmail) {
          const user = await UserService.getUserByEmail(userEmail);
          if (user) {
            set({ 
              isAuthenticated: true,
              user: {
                email: user.email,
                fullName: user.fullName,
              }
            });
            
            OrderService.setCurrentUser(user.email);
            
            const cartStore = getCartStore().getState();
            await cartStore.loadCart(user.email);
          } else {
            set({ isAuthenticated: true });
          }
        } else {
          set({ isAuthenticated: true });
        }
        if (result.token) {
          await SecureStore.setItemAsync("authToken", result.token);
        }
      } else {
        set({ error: result.message || "Biometric authentication failed" });
      }
    } catch (error) {
      set({ error: "An error occurred during biometric authentication" });
    } finally {
      set({ isLoading: false });
    }
  },

  logout: async () => {
    const { user } = get();
    
    if (user?.email) {
      const cartStore = getCartStore().getState();
      await cartStore.saveCart(user.email);
    }
    
    set({ isAuthenticated: false, error: null, user: null });
    
    await SecureStore.deleteItemAsync("authToken");
    await SecureStore.deleteItemAsync("userEmail");
    await SecureStore.deleteItemAsync("userPassword");
  },

  restoreSession: async () => {
    set({ isLoading: true, error: null });
    try {
      const userEmail = await SecureStore.getItemAsync("userEmail");
      
      if (userEmail) {
        const user = await UserService.getUserByEmail(userEmail);
        
        if (user) {
          set({ 
            isAuthenticated: true,
            biometricEnabled: true,
            user: {
              email: user.email,
              fullName: user.fullName,
            }
          });
          
          OrderService.setCurrentUser(user.email);
          
          const cartStore = getCartStore().getState();
          await cartStore.loadCart(user.email);
        }
      }
    } catch (error) {
    } finally {
      set({ isLoading: false });
    }
  },
}));
