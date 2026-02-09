import { Product, ProductFilters } from '../../../shared/types/product.types';

export interface ProductState {
  products: Product[];
  loading: boolean;
  error: string | null;
  filters: ProductFilters;
  page: number;
  pageSize: number;
  total: number;
  categories: string[];
}

export interface ProductActions {
  fetchProducts: () => Promise<void>;
  fetchCategories: () => Promise<void>;
  setFilters: (filters: ProductFilters) => void;
  setPage: (page: number) => void;
  clearFilters: () => void;
  reset: () => void;
}

export type ProductStore = ProductState & ProductActions;
