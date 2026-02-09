import { Redirect } from 'expo-router';
import { useEffect, useState, useRef } from 'react';
import { ActivityIndicator, View } from 'react-native';
import { useAuthStore } from '../src/modules/auth/store';

export default function Index() {
  const isAuthenticated = useAuthStore((state) => state.isAuthenticated);
  const isLoading = useAuthStore((state) => state.isLoading);
  const restoreSession = useAuthStore((state) => state.restoreSession);
  
  const [hasCheckedSession, setHasCheckedSession] = useState(false);
  const hasRestoredRef = useRef(false);

  useEffect(() => {
    const restore = async () => {
      if (hasRestoredRef.current) return;
      
      hasRestoredRef.current = true;
      await restoreSession();
      
      await new Promise(resolve => setTimeout(resolve, 100));
      
      const currentState = useAuthStore.getState();
      
      setHasCheckedSession(true);
    };
    
    restore();
  }, []);

  if (!hasCheckedSession || isLoading) {
    return (
      <View style={{ flex: 1, justifyContent: 'center', alignItems: 'center', backgroundColor: '#fff' }}>
        <ActivityIndicator size="large" color="#0fb14c" />
      </View>
    );
  }

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Redirect href="/(tabs)" />;
}