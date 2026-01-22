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
  supportedAuthenticationTypesAsync: jest.fn(() => Promise.resolve([1])), // FINGERPRINT
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

// Mock para styled-components
jest.mock('styled-components/native', () => ({
  default: {
    View: 'View',
    Text: 'Text',
    TouchableOpacity: 'TouchableOpacity',
    TextInput: 'TextInput',
  },
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
  useTheme: () => ({
    colors: {
      background: '#ffffff',
      text: '#000000',
      primary: '#007bff',
      secondary: '#6c757d',
      danger: '#dc3545',
    },
  }),
}));

// Mock para zustand
jest.mock('zustand', () => ({
  create: jest.fn((fn) => fn(() => ({}), () => ({}))),
}));

// Mock global para useAuthStore
jest.mock('./src/modules/biometric-auth/store', () => ({
  useAuthStore: jest.fn(),
}));

// Mock global para useTheme
jest.mock('./src/theme/ThemeContext', () => ({
  useTheme: jest.fn(),
  ThemeProvider: ({ children }: { children: React.ReactNode }) => children,
}));