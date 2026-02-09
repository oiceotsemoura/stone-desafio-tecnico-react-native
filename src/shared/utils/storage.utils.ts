import AsyncStorage from '@react-native-async-storage/async-storage';

const KEYS = {
  THEME: '@app:theme',
  CART: '@app:cart',
  ORDERS: '@app:orders',
} as const;

export class StorageUtils {
  static async saveTheme(isDark: boolean): Promise<void> {
    try {
      await AsyncStorage.setItem(KEYS.THEME, JSON.stringify(isDark));
    } catch (error) {
    }
  }

  static async loadTheme(): Promise<boolean | null> {
    try {
      const theme = await AsyncStorage.getItem(KEYS.THEME);
      return theme ? JSON.parse(theme) : null;
    } catch (error) {
      return null;
    }
  }

  static async saveCart(userEmail: string, cart: any): Promise<void> {
    try {
      const key = `${KEYS.CART}:${userEmail}`;
      await AsyncStorage.setItem(key, JSON.stringify(cart));
    } catch (error) {
    }
  }

  static async loadCart(userEmail: string): Promise<any | null> {
    try {
      const key = `${KEYS.CART}:${userEmail}`;
      const cart = await AsyncStorage.getItem(key);
      return cart ? JSON.parse(cart) : null;
    } catch (error) {
      return null;
    }
  }

  static async clearCart(userEmail: string): Promise<void> {
    try {
      const key = `${KEYS.CART}:${userEmail}`;
      await AsyncStorage.removeItem(key);
    } catch (error) {
    }
  }

  static async saveOrders(userEmail: string, orders: any[]): Promise<void> {
    try {
      const key = `${KEYS.ORDERS}:${userEmail}`;
      await AsyncStorage.setItem(key, JSON.stringify(orders));
    } catch (error) {
    }
  }

  static async loadOrders(userEmail: string): Promise<any[] | null> {
    try {
      const key = `${KEYS.ORDERS}:${userEmail}`;
      const orders = await AsyncStorage.getItem(key);
      return orders ? JSON.parse(orders) : null;
    } catch (error) {
      return null;
    }
  }

  static async clearUserData(userEmail: string): Promise<void> {
    try {
      await Promise.all([
        AsyncStorage.removeItem(`${KEYS.CART}:${userEmail}`),
        AsyncStorage.removeItem(`${KEYS.ORDERS}:${userEmail}`),
      ]);
    } catch (error) {
    }
  }
}
