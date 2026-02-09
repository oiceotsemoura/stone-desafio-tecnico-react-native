import React from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useAuthStore } from '../../../auth/store';
import { useTheme } from '../../../../theme/ThemeContext';
import { useCartStore } from '../../../cart/store';
import * as S from './settings.styles';

export const SettingsScreen: React.FC = () => {
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

  return (
    <S.Container>
      <S.Header>
        <S.Title>Configurações</S.Title>
      </S.Header>

      <S.ScrollContent>
        <S.Section>
        <S.UserInfo>
          <S.UserAvatar>
            <S.UserAvatarText>
              {user?.fullName ? user.fullName.charAt(0).toUpperCase() : 'U'}
            </S.UserAvatarText>
          </S.UserAvatar>
          <S.UserDetails>
            <S.UserName>{user?.fullName || 'Usuário'}</S.UserName>
            <S.UserEmail>{user?.email || 'usuario@email.com'}</S.UserEmail>
          </S.UserDetails>
        </S.UserInfo>

        <S.SectionTitle>Aparência</S.SectionTitle>
        <S.SettingItem onPress={toggleTheme}>
          <S.SettingLeft>
            <S.SettingIcon>{isDark ? '🌙' : '☀️'}</S.SettingIcon>
            <S.SettingTextContainer>
              <S.SettingLabel>Tema</S.SettingLabel>
              <S.SettingDescription>
                Alterar entre tema claro e escuro
              </S.SettingDescription>
            </S.SettingTextContainer>
          </S.SettingLeft>
          <S.SettingRight>
            <S.SettingValue>{isDark ? 'Escuro' : 'Claro'}</S.SettingValue>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingRight>
        </S.SettingItem>

        <S.Divider />

        <S.SectionTitle>Compras</S.SectionTitle>
        <S.SettingItem onPress={handleGoToCart}>
          <S.SettingLeft>
            <S.SettingIcon>🛒</S.SettingIcon>
            <S.SettingTextContainer>
              <S.SettingLabel>Carrinho</S.SettingLabel>
              <S.SettingDescription>Ver itens no carrinho</S.SettingDescription>
            </S.SettingTextContainer>
          </S.SettingLeft>
          <S.SettingRight>
            {items.length > 0 && (
              <S.SettingValue>{items.length} {items.length === 1 ? 'item' : 'itens'}</S.SettingValue>
            )}
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingRight>
        </S.SettingItem>

        <S.SettingItem onPress={handleClearCart}>
          <S.SettingLeft>
            <S.SettingIcon>🗑️</S.SettingIcon>
            <S.SettingTextContainer>
              <S.SettingLabel>Limpar Carrinho</S.SettingLabel>
              <S.SettingDescription>Remover todos os itens</S.SettingDescription>
            </S.SettingTextContainer>
          </S.SettingLeft>
          <S.SettingRight>
            <S.SettingArrow>›</S.SettingArrow>
          </S.SettingRight>
        </S.SettingItem>

        <S.Divider />

        <S.LogoutButton onPress={handleLogout}>
          <S.LogoutButtonText>Sair da Conta</S.LogoutButtonText>
        </S.LogoutButton>

        <S.VersionText>Versão 1.0.0</S.VersionText>
      </S.Section>
      </S.ScrollContent>
    </S.Container>
  );
};
