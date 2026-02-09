import { Product, ProductListResponse, ProductFilters } from '../../../shared/types/product.types';

const MOCK_PRODUCTS: Product[] = [
  {
    id: '1',
    name: 'Smartphone XYZ',
    description: 'Smartphone de última geração com câmera de 108MP',
    price: 2999.99,
    image: 'https://picsum.photos/seed/smartphone/400/400',
    seller: 'Magazine Luiza',
    inStock: true,
    rating: 4.5,
  },
  {
    id: '2',
    name: 'Notebook ProBook',
    description: 'Notebook potente para trabalho e gaming',
    price: 4599.00,
    image: 'https://picsum.photos/seed/notebook/400/400',
    seller: 'Casas Bahia',
    inStock: true,
    rating: 4.8,
  },
  {
    id: '3',
    name: 'Fone Bluetooth Premium',
    description: 'Fone de ouvido com cancelamento de ruído',
    price: 599.90,
    image: 'https://picsum.photos/seed/headphone/400/400',
    seller: 'Americanas',
    inStock: false,
    rating: 4.3,
  },
  {
    id: '4',
    name: 'Smart Watch Fitness',
    description: 'Relógio inteligente com monitor de saúde',
    price: 899.00,
    image: 'https://picsum.photos/seed/watch/400/400',
    seller: 'Magazine Luiza',
    inStock: true,
    rating: 4.6,
  },
  {
    id: '5',
    name: 'Tablet Ultra HD',
    description: 'Tablet com tela de 10 polegadas e alta resolução',
    price: 1799.00,
    image: 'https://picsum.photos/seed/tablet/400/400',
    seller: 'Loja de Móveis do Seu Zé',
    inStock: true,
    rating: 4.4,
  },
  {
    id: '6',
    name: 'Carregador Rápido',
    description: 'Carregador de 65W com cabo USB-C',
    price: 149.90,
    image: 'https://picsum.photos/seed/charger/400/400',
    seller: 'Americanas',
    inStock: true,
    rating: 4.2,
  },
  {
    id: '7',
    name: 'Mouse Gamer RGB',
    description: 'Mouse com iluminação RGB e DPI ajustável',
    price: 249.00,
    image: 'https://picsum.photos/seed/mouse/400/400',
    seller: 'Pichau Games',
    inStock: true,
    rating: 4.7,
  },
  {
    id: '8',
    name: 'Teclado Mecânico',
    description: 'Teclado mecânico com switches blue',
    price: 449.00,
    image: 'https://picsum.photos/seed/keyboard/400/400',
    seller: 'Kabum',
    inStock: false,
    rating: 4.9,
  },
];

const delay = (ms: number) => new Promise(resolve => setTimeout(resolve, ms));

export class ProductService {
  static async getProducts(
    page: number = 1,
    pageSize: number = 10,
    filters?: ProductFilters
  ): Promise<ProductListResponse> {
    await delay(Math.random() * 1000 + 500);

    let filteredProducts = [...MOCK_PRODUCTS];

    if (filters) {
      if (filters.seller) {
        filteredProducts = filteredProducts.filter(
          p => p.seller.toLowerCase() === filters.seller?.toLowerCase()
        );
      }

      if (filters.minPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price >= filters.minPrice!);
      }

      if (filters.maxPrice !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.price <= filters.maxPrice!);
      }

      if (filters.inStock !== undefined) {
        filteredProducts = filteredProducts.filter(p => p.inStock === filters.inStock);
      }

      if (filters.searchTerm) {
        const term = filters.searchTerm.toLowerCase();
        filteredProducts = filteredProducts.filter(
          p =>
            p.name.toLowerCase().includes(term) ||
            p.description.toLowerCase().includes(term)
        );
      }
    }

    const total = filteredProducts.length;
    const startIndex = (page - 1) * pageSize;
    const paginatedProducts = filteredProducts.slice(startIndex, startIndex + pageSize);

    return {
      products: paginatedProducts,
      total,
      page,
      pageSize,
    };
  }

  static async getProductById(id: string): Promise<Product | null> {
    await delay(Math.random() * 500 + 300);

    const product = MOCK_PRODUCTS.find(p => p.id === id);
    return product || null;
  }

  static async getSellers(): Promise<string[]> {
    await delay(200);

    const sellers = [...new Set(MOCK_PRODUCTS.map(p => p.seller))];
    return sellers.sort();
  }

  static async getCategories(): Promise<string[]> {
    return this.getSellers();
  }
}
