import { create } from 'zustand';
import { CartStore } from './use-cart.types';
import { Product } from '../../../shared/types/product.types';
import { StorageUtils } from '../../../shared/utils/storage.utils';

const SHIPPING_COST = 15.00;
const TAX_RATE = 0.08; // 8%

const calculateSummaryUtil = (items: any[]) => {
  const subtotal = items.reduce((sum, item) => sum + (item.product.price * item.quantity), 0);
  const shipping = items.length > 0 ? SHIPPING_COST : 0;
  const tax = subtotal * TAX_RATE;
  const total = subtotal + shipping + tax;
  
  return { subtotal, shipping, tax, total };
};

export const useCartStore = create<CartStore>((set, get) => ({
  items: [],
  summary: {
    subtotal: 0,
    shipping: 0,
    tax: 0,
    total: 0,
  },

  loadCart: async (userEmail: string) => {
    const savedCart = await StorageUtils.loadCart(userEmail);
    if (savedCart) {
      set({
        items: savedCart.items || [],
        summary: savedCart.summary || {
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
        },
      });
    } else {
      set({
        items: [],
        summary: {
          subtotal: 0,
          shipping: 0,
          tax: 0,
          total: 0,
        },
      });
    }
  },

  saveCart: async (userEmail: string) => {
    const { items, summary } = get();
    await StorageUtils.saveCart(userEmail, { items, summary });
  },

  addItem: async (product: Product, quantity = 1, userEmail?: string) => {
    const { items } = get();
    const existingItemIndex = items.findIndex(item => item.product.id === product.id);

    let newItems;
    if (existingItemIndex >= 0) {
      newItems = [...items];
      newItems[existingItemIndex].quantity += quantity;
    } else {
      newItems = [...items, { product, quantity }];
    }

    const summary = calculateSummaryUtil(newItems);
    set({ items: newItems, summary });
    
    if (userEmail) {
      await StorageUtils.saveCart(userEmail, { items: newItems, summary });
    }
  },

  removeItem: async (productId: string, userEmail?: string) => {
    const { items } = get();
    const newItems = items.filter(item => item.product.id !== productId);
    const summary = calculateSummaryUtil(newItems);
    set({ items: newItems, summary });
    
    if (userEmail) {
      await StorageUtils.saveCart(userEmail, { items: newItems, summary });
    }
  },

  updateQuantity: async (productId: string, quantity: number, userEmail?: string) => {
    if (quantity <= 0) {
      await get().removeItem(productId, userEmail);
      return;
    }

    const { items } = get();
    const newItems = items.map(item =>
      item.product.id === productId ? { ...item, quantity } : item
    );
    const summary = calculateSummaryUtil(newItems);
    set({ items: newItems, summary });
    
    if (userEmail) {
      await StorageUtils.saveCart(userEmail, { items: newItems, summary });
    }
  },

  clearCart: async (userEmail?: string) => {
    set({
      items: [],
      summary: {
        subtotal: 0,
        shipping: 0,
        tax: 0,
        total: 0,
      },
    });
    
    if (userEmail) {
      await StorageUtils.clearCart(userEmail);
    }
  },

  getItemQuantity: (productId: string) => {
    const { items } = get();
    const item = items.find(item => item.product.id === productId);
    return item ? item.quantity : 0;
  },

  calculateSummary: () => {
    const { items } = get();
    const summary = calculateSummaryUtil(items);
    set({ summary });
  },
}));
