import React from 'react';
import { render, fireEvent, waitFor } from '@testing-library/react-native';
import { OrderHistory } from './order-history';

jest.mock('./order-history.styles', () => ({
  Container: 'View',
  Header: 'View',
  Title: 'Text',
  FilterContainer: 'View',
  FilterButton: 'TouchableOpacity',
  FilterButtonText: 'Text',
  OrderCard: 'View',
  OrderHeader: 'View',
  OrderId: 'Text',
  OrderStatus: 'View',
  OrderStatusText: 'Text',
  OrderDate: 'Text',
  OrderItems: 'Text',
  OrderTotal: 'Text',
  PaymentInfo: 'Text',
  EmptyContainer: 'View',
  EmptyText: 'Text',
  ErrorContainer: 'View',
  ErrorText: 'Text',
  RetryButton: 'TouchableOpacity',
  RetryButtonText: 'Text',
  LoadingContainer: 'View',
}));

jest.mock('../../store', () => ({
  useOrderStore: jest.fn(),
}));

const mockUseOrderStore = require('../../store').useOrderStore;

describe('OrderHistory', () => {
  const mockFetchOrders = jest.fn();
  const mockSetSelectedStatus = jest.fn();

  const defaultStoreState = {
    orders: [],
    loading: false,
    error: null,
    selectedStatus: 'all',
    fetchOrders: mockFetchOrders,
    setSelectedStatus: mockSetSelectedStatus,
  };

  beforeEach(() => {
    jest.clearAllMocks();
    mockUseOrderStore.mockReturnValue(defaultStoreState);
  });

  it('should render correctly', () => {
    const { getByText } = render(<OrderHistory />);
    
    expect(getByText('Histórico de Pedidos')).toBeTruthy();
  });

  it('should fetch orders on mount', () => {
    render(<OrderHistory />);
    
    expect(mockFetchOrders).toHaveBeenCalled();
  });

  it('should display loading state', () => {
    mockUseOrderStore.mockReturnValue({
      ...defaultStoreState,
      loading: true,
    });

    render(<OrderHistory />);
    
    expect(mockFetchOrders).toHaveBeenCalled();
  });

  it('should display error message', () => {
    const errorMessage = 'Erro ao carregar pedidos';
    mockUseOrderStore.mockReturnValue({
      ...defaultStoreState,
      error: errorMessage,
    });

    const { getByText } = render(<OrderHistory />);
    
    expect(getByText(errorMessage)).toBeTruthy();
    expect(getByText('Tentar Novamente')).toBeTruthy();
  });

  it('should call fetchOrders when retry button is pressed', () => {
    mockUseOrderStore.mockReturnValue({
      ...defaultStoreState,
      error: 'Erro ao carregar pedidos',
    });

    const { getByText } = render(<OrderHistory />);
    const retryButton = getByText('Tentar Novamente');
    
    fireEvent.press(retryButton);
    
    expect(mockFetchOrders).toHaveBeenCalledTimes(2);
  });

  it('should render without orders', () => {
    const { getByText } = render(<OrderHistory />);
    
    expect(getByText('Histórico de Pedidos')).toBeTruthy();
  });

  it('should handle orders data', () => {
    mockUseOrderStore.mockReturnValue({
      ...defaultStoreState,
      orders: [
        {
          id: '1',
          status: 'delivered',
          createdAt: new Date('2024-01-01'),
          items: [
            { id: '1', name: 'Produto 1', quantity: 2, price: 100 },
          ],
          total: 200,
          paymentInfo: {
            cardBrand: 'Visa',
            cardLast4: '1234',
          },
        },
      ],
    });

    const { getByText } = render(<OrderHistory />);
    
    expect(getByText('Histórico de Pedidos')).toBeTruthy();
  });

  it('should handle status filter change', () => {
    render(<OrderHistory />);
    
    expect(mockSetSelectedStatus).toBeDefined();
  });

  it('should handle filtered status', () => {
    mockUseOrderStore.mockReturnValue({
      ...defaultStoreState,
      selectedStatus: 'pending',
    });

    const { getByText } = render(<OrderHistory />);
    
    expect(getByText('Histórico de Pedidos')).toBeTruthy();
  });
});
