import BiometricLogin from '../src/modules/biometric-auth/screens/biometric-login/biometric-login';
import { useAuthStore } from '../src/modules/biometric-auth/store';
import { Redirect } from 'expo-router';

export default function Login() {
  const { isAuthenticated } = useAuthStore();

  if (isAuthenticated) {
    return <Redirect href="/" />;
  }

  return <BiometricLogin />;
}