import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../../auth/store';
import { useTheme } from '../../../../theme/ThemeContext';
import { useCartStore } from '../../../cart/store';

export const useSettings = () => {
  const router = useRouter();
  const { logout, user } = useAuthStore();
  const { toggleTheme, isDark } = useTheme();
  const { items, clearCart } = useCartStore();

  const handleLogout = async () => {
    Alert.alert(
      'Sair',
      'Tem certeza que deseja sair?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Sair',
          style: 'destructive',
          onPress: async () => {
            await logout();
          },
        },
      ]
    );
  };

  const handleClearCart = () => {
    if (items.length === 0) {
      Alert.alert('Carrinho Vazio', 'Seu carrinho já está vazio.');
      return;
    }

    Alert.alert(
      'Limpar Carrinho',
      'Tem certeza que deseja remover todos os itens do carrinho?',
      [
        { text: 'Cancelar', style: 'cancel' },
        {
          text: 'Limpar',
          style: 'destructive',
          onPress: async () => {
            await clearCart(user?.email);
            Alert.alert('Sucesso', 'Carrinho limpo com sucesso!');
          },
        },
      ]
    );
  };

  const handleGoToCart = () => {
    router.push('/cart');
  };

  const handleToggleTheme = () => {
    toggleTheme();
  };

  return {
    user,
    isDark,
    items,
    handleLogout,
    handleClearCart,
    handleGoToCart,
    handleToggleTheme,
  };
};
