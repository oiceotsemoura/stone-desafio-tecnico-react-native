import { ProductService } from './product.service';

describe('ProductService', () => {
  describe('getProducts', () => {
    it('should return paginated products', async () => {
      const result = await ProductService.getProducts(1, 5);

      expect(result).toHaveProperty('products');
      expect(result).toHaveProperty('total');
      expect(result).toHaveProperty('page');
      expect(result).toHaveProperty('pageSize');
      expect(result.products).toHaveLength(5);
      expect(result.page).toBe(1);
      expect(result.pageSize).toBe(5);
    });

    it('should filter products by seller', async () => {
      const result = await ProductService.getProducts(1, 10, {
        seller: 'Magazine Luiza',
      });

      expect(result.products.every((p) => p.seller === 'Magazine Luiza')).toBe(true);
    });

    it('should filter products by price range', async () => {
      const result = await ProductService.getProducts(1, 10, {
        minPrice: 500,
        maxPrice: 2000,
      });

      expect(
        result.products.every((p) => p.price >= 500 && p.price <= 2000)
      ).toBe(true);
    });

    it('should filter products by stock status', async () => {
      const result = await ProductService.getProducts(1, 10, {
        inStock: true,
      });

      expect(result.products.every((p) => p.inStock === true)).toBe(true);
    });

    it('should filter products by search term', async () => {
      const result = await ProductService.getProducts(1, 10, {
        searchTerm: 'smartphone',
      });

      expect(
        result.products.every(
          (p) =>
            p.name.toLowerCase().includes('smartphone') ||
            p.description.toLowerCase().includes('smartphone')
        )
      ).toBe(true);
    });

    it('should return empty array when no products match filters', async () => {
      const result = await ProductService.getProducts(1, 10, {
        searchTerm: 'produto inexistente xyz',
      });

      expect(result.products).toHaveLength(0);
      expect(result.total).toBe(0);
    });

    it('should handle pagination correctly', async () => {
      const page1 = await ProductService.getProducts(1, 3);
      const page2 = await ProductService.getProducts(2, 3);

      expect(page1.products).toHaveLength(3);
      expect(page2.products).toHaveLength(3);
      expect(page1.products[0].id).not.toBe(page2.products[0].id);
    });
  });

  describe('getProductById', () => {
    it('should return a product by id', async () => {
      const product = await ProductService.getProductById('1');

      expect(product).not.toBeNull();
      expect(product?.id).toBe('1');
      expect(product?.name).toBeDefined();
    });

    it('should return null for non-existent product', async () => {
      const product = await ProductService.getProductById('999');

      expect(product).toBeNull();
    });
  });

  describe('getCategories', () => {
    it('should return all unique categories', async () => {
      const categories = await ProductService.getCategories();

      expect(Array.isArray(categories)).toBe(true);
      expect(categories.length).toBeGreaterThan(0);
      expect(new Set(categories).size).toBe(categories.length);
    });

    it('should return sorted categories', async () => {
      const categories = await ProductService.getCategories();
      const sortedCategories = [...categories].sort();

      expect(categories).toEqual(sortedCategories);
    });
  });
});
