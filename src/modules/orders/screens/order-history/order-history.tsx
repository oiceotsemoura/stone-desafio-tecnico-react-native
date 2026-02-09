import React from 'react';
import { FlatList, ActivityIndicator } from 'react-native';
import { Order } from '../../../../shared/types/order.types';
import { useOrderHistory } from './use-order-history';
import * as S from './order-history.styles';

export const OrderHistory: React.FC = () => {
  const {
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
  } = useOrderHistory();

  const renderOrder = ({ item }: { item: Order }) => {
    const itemCount = getItemCount(item);
    
    return (
      <S.OrderCard>
        <S.OrderHeader>
          <S.OrderId>Pedido #{item.id}</S.OrderId>
          <S.OrderStatus status={item.status}>
            <S.OrderStatusText>{STATUS_LABELS[item.status]}</S.OrderStatusText>
          </S.OrderStatus>
        </S.OrderHeader>
        <S.OrderDate>{formatDate(item.createdAt)}</S.OrderDate>
        <S.OrderItems>
          {itemCount} {itemCount === 1 ? 'item' : 'itens'}
        </S.OrderItems>
        <S.OrderTotal>{formatPrice(item.total)}</S.OrderTotal>
        <S.PaymentInfo>
          {item.paymentInfo.cardBrand} •••• {item.paymentInfo.cardLast4}
        </S.PaymentInfo>
      </S.OrderCard>
    );
  };

  const renderEmpty = () => (
    <S.EmptyContainer>
      <S.EmptyText>
        {selectedStatus === 'all'
          ? 'Você ainda não fez nenhum pedido'
          : `Nenhum pedido ${STATUS_LABELS[selectedStatus].toLowerCase()}`}
      </S.EmptyText>
    </S.EmptyContainer>
  );

  const renderError = () => (
    <S.ErrorContainer>
      <S.ErrorText>{error}</S.ErrorText>
      <S.RetryButton onPress={handleRetry}>
        <S.RetryButtonText>Tentar Novamente</S.RetryButtonText>
      </S.RetryButton>
    </S.ErrorContainer>
  );

  const renderLoading = () => (
    <S.LoadingContainer>
      <ActivityIndicator size="large" color="#0fb14c" />
    </S.LoadingContainer>
  );

  if (error && !loading) {
    return (
      <S.Container>
        <S.Header>
          <S.Title>Histórico de Pedidos</S.Title>
        </S.Header>
        {renderError()}
      </S.Container>
    );
  }

  return (
    <S.Container>
      <S.Header>
        <S.Title>Histórico de Pedidos</S.Title>
      </S.Header>

      <S.FilterContainer>
        <FlatList
          horizontal
          data={['all', 'pending', 'processing', 'shipped', 'delivered', 'cancelled']}
          keyExtractor={(item) => item}
          showsHorizontalScrollIndicator={false}
          renderItem={({ item }) => (
            <S.FilterButton
              active={selectedStatus === item}
              onPress={() => handleStatusChange(item)}
            >
              <S.FilterButtonText active={selectedStatus === item}>
                {STATUS_LABELS[item]}
              </S.FilterButtonText>
            </S.FilterButton>
          )}
        />
      </S.FilterContainer>

      {loading && orders.length === 0 ? (
        renderLoading()
      ) : (
        <FlatList
          data={orders}
          keyExtractor={(item) => item.id}
          renderItem={renderOrder}
          ListEmptyComponent={renderEmpty}
          contentContainerStyle={{ paddingVertical: 8, flexGrow: 1 }}
          refreshing={loading}
          onRefresh={handleRetry}
        />
      )}
    </S.Container>
  );
};
