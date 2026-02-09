import { CartItem } from './cart.types';

export type OrderStatus = 'pending' | 'processing' | 'shipped' | 'delivered' | 'cancelled';

export interface PaymentInfo {
  method: 'credit_card';
  cardLast4: string;
  cardBrand: string;
}

export interface Order {
  id: string;
  items: CartItem[];
  total: number;
  status: OrderStatus;
  createdAt: Date;
  paymentInfo: PaymentInfo;
  shippingAddress?: {
    street: string;
    city: string;
    state: string;
    zipCode: string;
  };
}
