// Mock para expo-secure-store
jest.mock('expo-secure-store', () => ({
  setItemAsync: jest.fn(() => Promise.resolve()),
  getItemAsync: jest.fn(() => Promise.resolve(null)),
  deleteItemAsync: jest.fn(() => Promise.resolve()),
}));

// Mock para expo-local-authentication
jest.mock('expo-local-authentication', () => ({
  authenticateAsync: jest.fn(() => Promise.resolve({ success: true })),
  hasHardwareAsync: jest.fn(() => Promise.resolve(true)),
  supportedAuthenticationTypesAsync: jest.fn(() => Promise.resolve([1])),
}));

// Mock para react-native-mmkv
jest.mock('react-native-mmkv', () => ({
  MMKV: jest.fn().mockImplementation(() => ({
    set: jest.fn(),
    getString: jest.fn(),
    delete: jest.fn(),
  })),
}));

// Mock para expo-router
jest.mock('expo-router', () => ({
  useRouter: () => ({
    push: jest.fn(),
    replace: jest.fn(),
    back: jest.fn(),
  }),
  useLocalSearchParams: () => ({}),
  useGlobalSearchParams: () => ({}),
  Link: 'Link',
  Redirect: 'Redirect',
  Slot: 'Slot',
  Stack: 'Stack',
}));

// Mock para react-native
jest.mock('react-native', () => ({
  View: 'View',
  Text: 'Text',
  TouchableOpacity: 'TouchableOpacity',
  TextInput: 'TextInput',
  Alert: {
    alert: jest.fn(),
  },
  Platform: {
    OS: 'ios',
  },
}));

// Mock para styled-components
jest.mock('styled-components/native', () => {
  const mockStyled = (component) => component;
  mockStyled.View = 'View';
  mockStyled.Text = 'Text';
  mockStyled.TouchableOpacity = 'TouchableOpacity';
  mockStyled.TextInput = 'TextInput';

  return {
    default: mockStyled,
    ThemeProvider: ({ children }) => children,
    useTheme: () => ({
      colors: {
        background: '#ffffff',
        text: '#000000',
        primary: '#007bff',
        secondary: '#6c757d',
        danger: '#dc3545',
      },
    }),
  };
});

// Mock para zustand
jest.mock('zustand', () => ({
  create: jest.fn((fn) => fn(() => ({}), () => ({}))),
}));