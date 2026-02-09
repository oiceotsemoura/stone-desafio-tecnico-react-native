import { Stack, useRouter, useSegments } from 'expo-router';
import { SafeAreaProvider } from 'react-native-safe-area-context';
import { ThemeProvider, useTheme } from '../src/theme/ThemeContext';
import { useEffect, useRef } from 'react';
import { useAuthStore } from '../src/modules/auth/store';

function RootLayoutNav() {
  const { theme } = useTheme();
  const segments = useSegments();
  const router = useRouter();
  const { isAuthenticated, restoreSession, isLoading } = useAuthStore();
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    if (hasRestoredRef.current) return;
    
    hasRestoredRef.current = true;
    
    const restore = async () => {
      await restoreSession();
      
      const state = useAuthStore.getState();
      
      if (!state.isAuthenticated) {
        router.replace('/login');
      } else {
        router.replace('/(tabs)');
      }
    };
    
    restore();
  }, []);

  useEffect(() => {
    if (!hasRestoredRef.current || isLoading) return;
    
    const inAuthGroup = segments[0] === '(tabs)' || segments[0] === 'cart' || segments[0] === 'checkout';
    
    if (!isAuthenticated && inAuthGroup) {
      router.replace('/login');
    }
  }, [isAuthenticated, isLoading]);

  return (
    <Stack 
      screenOptions={{ 
        headerShown: false,
        headerStyle: {
          backgroundColor: theme.colors.primary,
        },
        headerTintColor: '#ffffff',
        headerTitleStyle: {
          fontWeight: 'bold',
        },
      }}
    >
      <Stack.Screen name="login" />
      <Stack.Screen name="index" />
      <Stack.Screen name="(tabs)" />
      <Stack.Screen 
        name="cart" 
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Carrinho',
        }}
      />
      <Stack.Screen 
        name="checkout" 
        options={{
          presentation: 'modal',
          headerShown: true,
          title: 'Checkout',
        }}
      />
    </Stack>
  );
}

export default function RootLayout() {
  return (
    <SafeAreaProvider>
      <ThemeProvider>
        <RootLayoutNav />
      </ThemeProvider>
    </SafeAreaProvider>
  );
}