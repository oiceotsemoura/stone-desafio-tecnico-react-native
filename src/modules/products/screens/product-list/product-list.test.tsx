import React from 'react';
import { render, waitFor, fireEvent } from '@testing-library/react-native';
import { ProductList } from './product-list';
import { useProductStore } from '../../store';

// Mock do store
jest.mock('../../store', () => ({
  useProductStore: jest.fn(),
}));

const mockedUseProductStore = useProductStore as unknown as jest.Mock;

describe('ProductList', () => {
  const mockFetchProducts = jest.fn();
  const mockFetchCategories = jest.fn();
  const mockSetFilters = jest.fn();
  const mockSetPage = jest.fn();
  const mockClearFilters = jest.fn();

  const defaultStoreState = {
    products: [],
    loading: false,
    error: null,
    filters: {},
    page: 1,
    pageSize: 10,
    total: 0,
    categories: ['Eletrônicos', 'Acessórios'],
    fetchProducts: mockFetchProducts,
    fetchCategories: mockFetchCategories,
    setFilters: mockSetFilters,
    setPage: mockSetPage,
    clearFilters: mockClearFilters,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockedUseProductStore.mockReturnValue(defaultStoreState);
  });

  it('should render correctly', () => {
    const { getByText } = render(<ProductList />);
    
    expect(getByText('Produtos')).toBeTruthy();
  });

  it('should fetch products on mount', () => {
    render(<ProductList />);
    
    expect(mockFetchProducts).toHaveBeenCalled();
    expect(mockFetchCategories).toHaveBeenCalled();
  });

  it('should display loading state', () => {
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      loading: true,
    });

    render(<ProductList />);
    
    // Loading state should trigger ActivityIndicator
    expect(mockFetchProducts).toHaveBeenCalled();
  });

  it('should display error message', () => {
    const errorMessage = 'Erro ao carregar produtos';
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      error: errorMessage,
    });

    const { getByText } = render(<ProductList />);
    
    expect(getByText(errorMessage)).toBeTruthy();
    expect(getByText('Tentar Novamente')).toBeTruthy();
  });

  it('should handle search input', async () => {
    const { getByPlaceholderText } = render(<ProductList />);
    const searchInput = getByPlaceholderText('Buscar produtos...');

    fireEvent.changeText(searchInput, 'teste');

    await waitFor(() => {
      expect(mockSetFilters).toHaveBeenCalledWith({ searchTerm: 'teste' });
    });
  });

  it('should clear search when empty', async () => {
    const { getByPlaceholderText } = render(<ProductList />);
    const searchInput = getByPlaceholderText('Buscar produtos...');

    fireEvent.changeText(searchInput, '');

    await waitFor(() => {
      expect(mockSetFilters).toHaveBeenCalledWith({ searchTerm: undefined });
    });
  });

  it('should not search with less than 3 characters', async () => {
    const { getByPlaceholderText } = render(<ProductList />);
    const searchInput = getByPlaceholderText('Buscar produtos...');

    fireEvent.changeText(searchInput, 'te');

    await waitFor(() => {
      // Should not call setFilters for less than 3 characters
      expect(mockSetFilters).not.toHaveBeenCalled();
    }, { timeout: 1000 });
  });

  it('should handle pagination next', () => {
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      products: [
        {
          id: '1',
          name: 'Produto 1',
          description: 'Desc 1',
          price: 99.99,
          image: 'https://example.com/1.jpg',
          category: 'Eletrônicos',
          inStock: true,
          rating: 4.5,
        },
      ],
      total: 20,
      page: 1,
      pageSize: 10,
    });

    const { getByText } = render(<ProductList />);
    
    const nextButton = getByText('Próxima');
    fireEvent.press(nextButton);

    expect(mockSetPage).toHaveBeenCalledWith(2);
  });

  it('should handle pagination previous', () => {
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      products: [
        {
          id: '1',
          name: 'Produto 1',
          description: 'Desc 1',
          price: 99.99,
          image: 'https://example.com/1.jpg',
          category: 'Eletrônicos',
          inStock: true,
          rating: 4.5,
        },
      ],
      total: 20,
      page: 2,
      pageSize: 10,
    });

    const { getByText } = render(<ProductList />);
    
    const previousButton = getByText('Anterior');
    fireEvent.press(previousButton);

    expect(mockSetPage).toHaveBeenCalledWith(1);
  });

  it('should retry on error', () => {
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      error: 'Erro ao carregar',
    });

    const { getByText } = render(<ProductList />);
    const retryButton = getByText('Tentar Novamente');

    fireEvent.press(retryButton);

    expect(mockFetchProducts).toHaveBeenCalled();
  });

  it('should display pagination info', () => {
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      products: [
        {
          id: '1',
          name: 'Produto 1',
          description: 'Desc 1',
          price: 99.99,
          image: 'https://example.com/1.jpg',
          category: 'Eletrônicos',
          inStock: true,
          rating: 4.5,
        },
      ],
      total: 30,
      page: 2,
      pageSize: 10,
    });

    const { getByText } = render(<ProductList />);
    
    expect(getByText('Página 2 de 3')).toBeTruthy();
  });
});

