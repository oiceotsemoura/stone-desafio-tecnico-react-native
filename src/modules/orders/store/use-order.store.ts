import { create } from 'zustand';
import { OrderStore } from './use-order.types';
import { OrderService } from '../services';
import { OrderStatus } from '../../../shared/types/order.types';

const initialState = {
  orders: [],
  loading: false,
  error: null,
  selectedStatus: 'all' as const,
};

export const useOrderStore = create<OrderStore>((set, get) => ({
  ...initialState,

  fetchOrders: async () => {
    set({ loading: true, error: null });
    try {
      const orders = await OrderService.getOrders();
      set({ orders, loading: false });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao buscar pedidos',
        loading: false,
      });
    }
  },

  fetchOrdersByStatus: async (status: OrderStatus) => {
    set({ loading: true, error: null });
    try {
      const orders = await OrderService.getOrdersByStatus(status);
      set({ orders, loading: false, selectedStatus: status });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao buscar pedidos',
        loading: false,
      });
    }
  },

  setSelectedStatus: (status) => {
    set({ selectedStatus: status });
    if (status === 'all') {
      get().fetchOrders();
    } else {
      get().fetchOrdersByStatus(status);
    }
  },

  reset: () => {
    set(initialState);
  },
}));
