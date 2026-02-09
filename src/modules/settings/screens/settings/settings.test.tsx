import React from 'react';
import { render, fireEvent } from '@testing-library/react-native';
import { SettingsScreen } from './settings';
import { Alert } from 'react-native';

jest.mock('./settings.styles', () => ({
  Container: 'View',
  Header: 'View',
  Title: 'Text',
  ScrollContent: 'ScrollView',
  Section: 'View',
  UserInfo: 'View',
  UserAvatar: 'View',
  UserAvatarText: 'Text',
  UserDetails: 'View',
  UserName: 'Text',
  UserEmail: 'Text',
  SectionTitle: 'Text',
  SettingItem: 'TouchableOpacity',
  SettingLeft: 'View',
  SettingIcon: 'Text',
  SettingTextContainer: 'View',
  SettingLabel: 'Text',
  SettingDescription: 'Text',
  SettingRight: 'View',
  SettingValue: 'Text',
  SettingArrow: 'Text',
  Divider: 'View',
  LogoutButton: 'TouchableOpacity',
  LogoutButtonText: 'Text',
  VersionText: 'Text',
}));

jest.mock('expo-router', () => ({
  useRouter: jest.fn(() => ({
    push: jest.fn(),
  })),
}));

jest.mock('../../../auth/store', () => ({
  useAuthStore: jest.fn(),
}));

jest.mock('../../../../theme/ThemeContext', () => ({
  useTheme: jest.fn(),
}));

jest.mock('../../../cart/store', () => ({
  useCartStore: jest.fn(),
}));

const mockUseAuthStore = require('../../../auth/store').useAuthStore;
const mockUseTheme = require('../../../../theme/ThemeContext').useTheme;
const mockUseCartStore = require('../../../cart/store').useCartStore;
const mockUseRouter = require('expo-router').useRouter;

describe('SettingsScreen', () => {
  const mockLogout = jest.fn();
  const mockToggleTheme = jest.fn();
  const mockClearCart = jest.fn();
  const mockPush = jest.fn();

  beforeEach(() => {
    jest.clearAllMocks();
    jest.spyOn(Alert, 'alert');

    mockUseAuthStore.mockReturnValue({
      logout: mockLogout,
      user: {
        email: 'test@example.com',
        fullName: 'Test User',
      },
    });

    mockUseTheme.mockReturnValue({
      toggleTheme: mockToggleTheme,
      isDark: false,
    });

    mockUseCartStore.mockReturnValue({
      items: [],
      clearCart: mockClearCart,
    });

    mockUseRouter.mockReturnValue({
      push: mockPush,
    });
  });

  it('should render correctly', () => {
    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('Configurações')).toBeTruthy();
    expect(getByText('Test User')).toBeTruthy();
    expect(getByText('test@example.com')).toBeTruthy();
    expect(getByText('Tema')).toBeTruthy();
    expect(getByText('Carrinho')).toBeTruthy();
    expect(getByText('Sair da Conta')).toBeTruthy();
  });

  it('should display light theme', () => {
    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('Claro')).toBeTruthy();
    expect(getByText('☀️')).toBeTruthy();
  });

  it('should display dark theme', () => {
    mockUseTheme.mockReturnValue({
      toggleTheme: mockToggleTheme,
      isDark: true,
    });

    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('Escuro')).toBeTruthy();
    expect(getByText('🌙')).toBeTruthy();
  });

  it('should toggle theme when theme setting is pressed', () => {
    const { getByText } = render(<SettingsScreen />);
    
    const themeSetting = getByText('Tema');
    fireEvent.press(themeSetting.parent.parent);
    
    expect(mockToggleTheme).toHaveBeenCalled();
  });

  it('should navigate to cart when cart setting is pressed', () => {
    const { getByText } = render(<SettingsScreen />);
    
    const cartSetting = getByText('Carrinho');
    fireEvent.press(cartSetting.parent.parent);
    
    expect(mockPush).toHaveBeenCalledWith('/cart');
  });

  it('should display cart item count', () => {
    mockUseCartStore.mockReturnValue({
      items: [{ id: '1' }, { id: '2' }],
      clearCart: mockClearCart,
    });

    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('2 itens')).toBeTruthy();
  });

  it('should show alert when clear cart is pressed with empty cart', () => {
    const { getByText } = render(<SettingsScreen />);
    
    const clearCartButton = getByText('Limpar Carrinho');
    fireEvent.press(clearCartButton.parent.parent);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Carrinho Vazio',
      'Seu carrinho já está vazio.'
    );
  });

  it('should show confirmation alert when clear cart is pressed with items', () => {
    mockUseCartStore.mockReturnValue({
      items: [{ id: '1' }],
      clearCart: mockClearCart,
    });

    const { getByText } = render(<SettingsScreen />);
    
    const clearCartButton = getByText('Limpar Carrinho');
    fireEvent.press(clearCartButton.parent.parent);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Limpar Carrinho',
      'Tem certeza que deseja remover todos os itens do carrinho?',
      expect.any(Array)
    );
  });

  it('should show logout confirmation alert', () => {
    const { getByText } = render(<SettingsScreen />);
    
    const logoutButton = getByText('Sair da Conta');
    fireEvent.press(logoutButton);
    
    expect(Alert.alert).toHaveBeenCalledWith(
      'Sair',
      'Tem certeza que deseja sair?',
      expect.any(Array)
    );
  });

  it('should display version number', () => {
    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('Versão 1.0.0')).toBeTruthy();
  });

  it('should display default user info when user is not logged in', () => {
    mockUseAuthStore.mockReturnValue({
      logout: mockLogout,
      user: null,
    });

    const { getByText } = render(<SettingsScreen />);
    
    expect(getByText('Usuário')).toBeTruthy();
    expect(getByText('usuario@email.com')).toBeTruthy();
  });
});
