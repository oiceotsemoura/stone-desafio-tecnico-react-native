import { Order, OrderStatus } from '../../../shared/types/order.types';

export interface OrderState {
  orders: Order[];
  loading: boolean;
  error: string | null;
  selectedStatus: OrderStatus | 'all';
}

export interface OrderActions {
  fetchOrders: () => Promise<void>;
  fetchOrdersByStatus: (status: OrderStatus) => Promise<void>;
  setSelectedStatus: (status: OrderStatus | 'all') => void;
  reset: () => void;
}

export type OrderStore = OrderState & OrderActions;
