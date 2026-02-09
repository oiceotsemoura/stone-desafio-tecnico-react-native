export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  image: string;
  seller: string;
  inStock: boolean;
  rating: number;
}

export interface ProductListResponse {
  products: Product[];
  total: number;
  page: number;
  pageSize: number;
}

export interface ProductFilters {
  seller?: string;
  minPrice?: number;
  maxPrice?: number;
  inStock?: boolean;
  searchTerm?: string;
}
