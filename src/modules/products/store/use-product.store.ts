import { create } from 'zustand';
import { ProductStore } from './use-product.types';
import { ProductService } from '../services';

const initialState = {
  products: [],
  loading: false,
  error: null,
  filters: {},
  page: 1,
  pageSize: 10,
  total: 0,
  categories: [],
};

export const useProductStore = create<ProductStore>((set, get) => ({
  ...initialState,

  fetchProducts: async () => {
    set({ loading: true, error: null });
    try {
      const { page, pageSize, filters } = get();
      const response = await ProductService.getProducts(page, pageSize, filters);
      
      set({
        products: response.products,
        total: response.total,
        loading: false,
      });
    } catch (error) {
      set({
        error: error instanceof Error ? error.message : 'Erro ao buscar produtos',
        loading: false,
      });
    }
  },

  fetchCategories: async () => {
    try {
      const sellers = await ProductService.getSellers();
      set({ categories: sellers });
    } catch (error) {
    }
  },

  setFilters: (filters) => {
    set({ filters, page: 1 });
    get().fetchProducts();
  },

  setPage: (page) => {
    set({ page });
    get().fetchProducts();
  },

  clearFilters: () => {
    set({ filters: {}, page: 1 });
    get().fetchProducts();
  },

  reset: () => {
    set(initialState);
  },
}));
