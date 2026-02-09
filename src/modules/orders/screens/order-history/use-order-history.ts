import { useEffect } from 'react';
import { useOrderStore } from '../../store';
import { Order } from '../../../../shared/types/order.types';

const STATUS_LABELS: Record<string, string> = {
  all: 'Todos',
  pending: 'Pendente',
  processing: 'Processando',
  shipped: 'Enviado',
  delivered: 'Entregue',
  cancelled: 'Cancelado',
};

export const useOrderHistory = () => {
  const { orders, loading, error, selectedStatus, fetchOrders, setSelectedStatus } =
    useOrderStore();

  useEffect(() => {
    fetchOrders();
  }, []);

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
    }).format(price);
  };

  const formatDate = (date: Date) => {
    return new Intl.DateTimeFormat('pt-BR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
    }).format(new Date(date));
  };

  const getItemCount = (order: Order) => {
    return order.items.reduce((sum, cartItem) => sum + cartItem.quantity, 0);
  };

  const handleStatusChange = (status: string) => {
    setSelectedStatus(status as any);
  };

  const handleRetry = () => {
    fetchOrders();
  };

  return {
    orders,
    loading,
    error,
    selectedStatus,
    STATUS_LABELS,
    formatPrice,
    formatDate,
    getItemCount,
    handleStatusChange,
    handleRetry,
  };
};
