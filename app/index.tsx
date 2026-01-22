import { Redirect } from 'expo-router';
import { useAuthStore } from '../src/modules/biometric-auth/store';
import Home from '../src/modules/home';

export default function Index() {
  const { isAuthenticated } = useAuthStore();

  if (!isAuthenticated) {
    return <Redirect href="/login" />;
  }

  return <Home />;
}