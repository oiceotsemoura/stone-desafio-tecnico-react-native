import React from "react";
import { FlatList, Alert } from "react-native";
import { useRouter } from "expo-router";
import { useCartStore } from "../../store";
import { useAuthStore } from "../../../auth/store";
import * as S from "./cart.styles";

export const CartScreen: React.FC = () => {
  const router = useRouter();
  const { items, summary, updateQuantity, removeItem, clearCart } =
    useCartStore();
  const { user } = useAuthStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat("pt-BR", {
      style: "currency",
      currency: "BRL",
    }).format(price);
  };

  const handleIncreaseQuantity = async (
    productId: string,
    currentQuantity: number,
  ) => {
    await updateQuantity(productId, currentQuantity + 1, user?.email);
  };

  const handleDecreaseQuantity = async (
    productId: string,
    currentQuantity: number,
  ) => {
    if (currentQuantity > 1) {
      await updateQuantity(productId, currentQuantity - 1, user?.email);
    }
  };

  const handleRemoveItem = (productId: string, productName: string) => {
    Alert.alert(
      "Remover Item",
      `Deseja remover "${productName}" do carrinho?`,
      [
        { text: "Cancelar", style: "cancel" },
        {
          text: "Remover",
          style: "destructive",
          onPress: async () => await removeItem(productId, user?.email),
        },
      ],
    );
  };

  const handleCheckout = () => {
    router.push("/checkout");
  };

  const handleContinueShopping = () => {
    router.back();
  };

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
