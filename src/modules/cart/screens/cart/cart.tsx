import React from "react";
import { FlatList } from "react-native";
import { useCart } from './use-cart';
import * as S from "./cart.styles";

export const CartScreen: React.FC = () => {
  const {
    items,
    summary,
    formatPrice,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
  } = useCart();

  const renderItem = ({ item }: any) => (
    <S.CartItem>
      <S.ItemImage 
        source={{ uri: item.product.image }}
      />
      <S.ItemInfo>
        <S.ItemName numberOfLines={2}>{item.product.name}</S.ItemName>
        <S.ItemPrice>{formatPrice(item.product.price)}</S.ItemPrice>
        <S.QuantityContainer>
          <S.QuantityButton
            onPress={() =>
              handleDecreaseQuantity(item.product.id, item.quantity)
            }
          >
            <S.QuantityButtonText>-</S.QuantityButtonText>
          </S.QuantityButton>
          <S.QuantityText>{item.quantity}</S.QuantityText>
          <S.QuantityButton
            onPress={() =>
              handleIncreaseQuantity(item.product.id, item.quantity)
            }
          >
            <S.QuantityButtonText>+</S.QuantityButtonText>
          </S.QuantityButton>
        </S.QuantityContainer>
      </S.ItemInfo>
      <S.RemoveButton
        onPress={() => handleRemoveItem(item.product.id, item.product.name)}
      >
        <S.RemoveButtonText>✕</S.RemoveButtonText>
      </S.RemoveButton>
    </S.CartItem>
  );

  const renderEmpty = () => (
    <S.EmptyContainer>
      <S.EmptyText>Seu carrinho está vazio</S.EmptyText>
      <S.EmptyButton onPress={handleContinueShopping}>
        <S.EmptyButtonText>Continuar Comprando</S.EmptyButtonText>
      </S.EmptyButton>
    </S.EmptyContainer>
  );

  return (
    <S.Container>
      {items.length === 0 ? (
        renderEmpty()
      ) : (
        <>
          <S.Content>
            <FlatList
              data={items}
              keyExtractor={(item) => item.product.id}
              renderItem={renderItem}
              contentContainerStyle={{ paddingVertical: 8 }}
            />
          </S.Content>

          <S.SummaryContainer>
            <S.SummaryRow>
              <S.SummaryLabel>Subtotal</S.SummaryLabel>
              <S.SummaryValue>{formatPrice(summary.subtotal)}</S.SummaryValue>
            </S.SummaryRow>
            <S.SummaryRow>
              <S.SummaryLabel>Frete</S.SummaryLabel>
              <S.SummaryValue>{formatPrice(summary.shipping)}</S.SummaryValue>
            </S.SummaryRow>
            <S.SummaryRow>
              <S.SummaryLabel>Impostos</S.SummaryLabel>
              <S.SummaryValue>{formatPrice(summary.tax)}</S.SummaryValue>
            </S.SummaryRow>
            <S.Divider />
            <S.SummaryRow>
              <S.SummaryLabel bold>Total</S.SummaryLabel>
              <S.SummaryValue bold>{formatPrice(summary.total)}</S.SummaryValue>
            </S.SummaryRow>
            <S.CheckoutButton onPress={handleCheckout}>
              <S.CheckoutButtonText>Finalizar Pedido</S.CheckoutButtonText>
            </S.CheckoutButton>
          </S.SummaryContainer>
        </>
      )}
    </S.Container>
  );
};
