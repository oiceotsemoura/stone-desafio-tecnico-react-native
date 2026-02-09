import { CartItem, CartSummary } from '../../../shared/types/cart.types';
import { Product } from '../../../shared/types/product.types';

export interface CartState {
  items: CartItem[];
  summary: CartSummary;
}

export interface CartActions {
  loadCart: (userEmail: string) => Promise<void>;
  saveCart: (userEmail: string) => Promise<void>;
  addItem: (product: Product, quantity?: number, userEmail?: string) => Promise<void>;
  removeItem: (productId: string, userEmail?: string) => Promise<void>;
  updateQuantity: (productId: string, quantity: number, userEmail?: string) => Promise<void>;
  clearCart: (userEmail?: string) => Promise<void>;
  getItemQuantity: (productId: string) => number;
  calculateSummary: () => void;
}

export type CartStore = CartState & CartActions;
