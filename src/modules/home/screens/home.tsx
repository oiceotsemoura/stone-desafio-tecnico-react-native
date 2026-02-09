import React from 'react';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../auth/store';
import { useTheme } from '../../../theme/ThemeContext';
import {
  Container,
  Title,
  Subtitle,
  Button,
  ButtonText,
  ThemeButton,
  ThemeButtonText,
} from './home.styles';

const Home: React.FC = () => {
  const { logout } = useAuthStore();
  const { toggleTheme, isDark } = useTheme();
  const router = useRouter();

  const handleLogout = async () => {
    await logout();
  };

  const navigateToProducts = () => {
    router.push('/products');
  };

  const navigateToCart = () => {
    router.push('/cart');
  };

  const navigateToOrders = () => {
    router.push('/orders');
  };

  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <Subtitle>Login realizado com sucesso.</Subtitle>
      <Button onPress={navigateToProducts}>
        <ButtonText>🛍️ Ver Produtos</ButtonText>
      </Button>
      <Button onPress={navigateToCart}>
        <ButtonText>🛒 Carrinho</ButtonText>
      </Button>
      <Button onPress={navigateToOrders}>
        <ButtonText>📦 Meus Pedidos</ButtonText>
      </Button>
      <Button onPress={handleLogout}>
        <ButtonText>Sair</ButtonText>
      </Button>
      <ThemeButton onPress={toggleTheme}>
        <ThemeButtonText>
          Mudar para {isDark ? 'Tema Claro' : 'Tema Escuro'}
        </ThemeButtonText>
      </ThemeButton>
    </Container>
  );
};

export default Home;