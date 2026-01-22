import * as LocalAuthentication from 'expo-local-authentication';
import { AuthResult } from './auth.service';

// Biometric authentication
export const authenticateWithBiometrics = async (): Promise<AuthResult> => {
  const hasHardware = await LocalAuthentication.hasHardwareAsync();
  const isEnrolled = await LocalAuthentication.isEnrolledAsync();

  if (!hasHardware || !isEnrolled) {
    return { success: false, message: 'Biometric authentication not available' };
  }

  const result = await LocalAuthentication.authenticateAsync({
    promptMessage: 'Authenticate with biometrics',
    fallbackLabel: 'Use password',
  });

  if (result.success) {
    const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiJiaW9tZXRyaWMiLCJuYW1lIjoiQmlvbWV0cmljIFVzZXIiLCJpYXQiOjE1MTYyMzkwMjJ9.mock-biometric-token';
    return { success: true, token: mockToken };
  } else {
    return { success: false, message: result.error || 'Authentication failed' };
  }
};