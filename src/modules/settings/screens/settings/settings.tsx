import React from 'react';
import { useSettings } from './use-settings';
import * as S from './settings.styles';

export const SettingsScreen: React.FC = () => {
  const {
    user,
    isDark,
    items,
    handleLogout,
    handleClearCart,
    handleGoToCart,
    handleToggleTheme,
  } = useSettings();

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
        <S.SettingItem onPress={handleToggleTheme}>
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
