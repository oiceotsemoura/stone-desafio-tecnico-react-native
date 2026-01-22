import React from 'react';
import { useAuthStore } from '../../biometric-auth/store';
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

  const handleLogout = async () => {
    await logout();
  };

  return (
    <Container>
      <Title>Bem-vindo!</Title>
      <Subtitle>Login realizado com sucesso.</Subtitle>
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