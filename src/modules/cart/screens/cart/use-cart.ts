import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useCartStore } from '../../store';
import { useAuthStore } from '../../../auth/store';

export const useCart = () => {
  const router = useRouter();
  const { items, summary, updateQuantity, removeItem, clearCart } = useCartStore();
  const { user } = useAuthStore();

  const formatPrice = (price: number) => {
    return new Intl.NumberFormat('pt-BR', {
      style: 'currency',
      currency: 'BRL',
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
      'Remover Item',
      `Deseja remover "${productName}" do carrinho?`,
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Remover',
          style: 'destructive',
          onPress: async () => await removeItem(productId, user?.email),
        },
      ],
    );
  };

  const handleCheckout = () => {
    router.push('/checkout');
  };

  const handleContinueShopping = () => {
    router.back();
  };

  return {
    items,
    summary,
    formatPrice,
    handleIncreaseQuantity,
    handleDecreaseQuantity,
    handleRemoveItem,
    handleCheckout,
    handleContinueShopping,
  };
};
