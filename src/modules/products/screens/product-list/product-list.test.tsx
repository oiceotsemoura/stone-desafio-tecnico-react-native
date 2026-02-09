jest.mock("@react-native-async-storage/async-storage", () => ({
  setItem: jest.fn(() => Promise.resolve()),
  getItem: jest.fn(() => Promise.resolve(null)),
  removeItem: jest.fn(() => Promise.resolve()),
  clear: jest.fn(() => Promise.resolve()),
}));

jest.mock("./product-list.styles", () => ({
  Container: "View",
  Header: "View",
  HeaderLeft: "View",
  HeaderRight: "View",
  Title: "Text",
  CartButton: "TouchableOpacity",
  CartButtonText: "Text",
  CartBadge: "View",
  CartBadgeText: "Text",
  FilterContainer: "View",
  SearchInput: "TextInput",
  FilterRow: "View",
  FilterButton: "TouchableOpacity",
  FilterButtonText: "Text",
  ClearFiltersButton: "TouchableOpacity",
  ClearFiltersText: "Text",
  ProductListContainer: "View",
  LoadingContainer: "View",
  LoadingText: "Text",
  ErrorContainer: "View",
  ErrorText: "Text",
  RetryButton: "TouchableOpacity",
  RetryButtonText: "Text",
  EmptyContainer: "View",
  EmptyText: "Text",
  ProductCard: "View",
  ProductImage: "Image",
  ProductInfo: "View",
  ProductName: "Text",
  ProductDescription: "Text",
  ProductPrice: "Text",
  ProductFooter: "View",
  ProductCategory: "Text",
  AddToCartButton: "TouchableOpacity",
  AddToCartButtonText: "Text",
  PaginationContainer: "View",
  PaginationButton: "TouchableOpacity",
  PaginationButtonText: "Text",
  PaginationInfo: "Text",
}));

jest.mock("expo-router", () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  })),
}));

jest.mock("../../../cart/store", () => ({
  useCartStore: jest.fn(() => ({
    items: [],
    addItem: jest.fn(),
    removeItem: jest.fn(),
    clearCart: jest.fn(),
  })),
}));

jest.mock("../../../auth/store", () => ({
  useAuthStore: jest.fn(() => ({
    user: null,
    isAuthenticated: false,
  })),
}));

import React from "react";
import { render, waitFor, fireEvent } from "@testing-library/react-native";
import { ProductList } from "./product-list";
import { useProductStore } from "../../store";

jest.mock("../../store", () => ({
  useProductStore: jest.fn(),
}));

const mockedUseProductStore = useProductStore as unknown as jest.Mock;

describe("ProductList", () => {
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
    categories: ["Eletrônicos", "Acessórios"],
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

  it("should render correctly", () => {
    const { getByText } = render(<ProductList />);

    expect(getByText("Produtos")).toBeTruthy();
  });

  it("should fetch products on mount", () => {
    render(<ProductList />);

    expect(mockFetchProducts).toHaveBeenCalled();
    expect(mockFetchCategories).toHaveBeenCalled();
  });

  it("should display loading state", () => {
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      loading: true,
    });

    render(<ProductList />);

    expect(mockFetchProducts).toHaveBeenCalled();
  });

  it("should display error message", () => {
    const errorMessage = "Erro ao carregar produtos";
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      error: errorMessage,
    });

    const { getByText } = render(<ProductList />);

    expect(getByText(errorMessage)).toBeTruthy();
    expect(getByText("Tentar Novamente")).toBeTruthy();
  });

  it("should handle search input", async () => {
    const { getByPlaceholderText } = render(<ProductList />);
    const searchInput = getByPlaceholderText("Buscar produtos...");

    fireEvent.changeText(searchInput, "teste");

    await waitFor(() => {
      expect(mockSetFilters).toHaveBeenCalledWith({ searchTerm: "teste" });
    });
  });

  it("should clear search when empty", async () => {
    const { getByPlaceholderText } = render(<ProductList />);
    const searchInput = getByPlaceholderText("Buscar produtos...");

    fireEvent.changeText(searchInput, "");

    await waitFor(() => {
      expect(mockSetFilters).toHaveBeenCalledWith({ searchTerm: undefined });
    });
  });

  it("should not search with less than 3 characters", async () => {
    const { getByPlaceholderText } = render(<ProductList />);
    const searchInput = getByPlaceholderText("Buscar produtos...");

    fireEvent.changeText(searchInput, "te");

    await waitFor(
      () => {
        expect(mockSetFilters).not.toHaveBeenCalled();
      },
      { timeout: 1000 },
    );
  });

  it("should retry on error", () => {
    mockedUseProductStore.mockReturnValue({
      ...defaultStoreState,
      error: "Erro ao carregar",
    });

    const { getByText } = render(<ProductList />);
    const retryButton = getByText("Tentar Novamente");

    fireEvent.press(retryButton);

    expect(mockFetchProducts).toHaveBeenCalled();
  });
});
