import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { useBiometricLogin } from './use-biometric-login';
import { useAuthStore } from '../../store';
import {
  Container,
  Logo,
  Input,
  ErrorText,
  LoginButton,
  BiometricButton,
  ButtonText,
  ForgotPassword,
  RegisterLink,
} from './biometric-login.styles';

const BiometricLogin: React.FC = () => {
  const router = useRouter();
  const {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    error,
    handleLogin,
    handleBiometricLogin,
  } = useBiometricLogin();

  const { biometricEnabled } = useAuthStore();

  const handleForgotPassword = () => {
    Alert.alert('Forgot Password', 'Feature not implemented yet.');
  };

  const handleRegister = () => {
    router.push('/register');
  };

  return (
    <Container>
      <Logo source={require('../../../../../assets/adaptive-icon.png')} />

      <Input
        placeholder="Email"
        value={email}
        onChangeText={setEmail}
        keyboardType="email-address"
        autoCapitalize="none"
        placeholderTextColor="#999"
      />
      {errors.email && <ErrorText>{errors.email}</ErrorText>}

      <Input
        placeholder="Password"
        value={password}
        onChangeText={setPassword}
        secureTextEntry
        placeholderTextColor="#999"
      />
      {errors.password && <ErrorText>{errors.password}</ErrorText>}

      {error && <ErrorText>{error}</ErrorText>}

      <LoginButton onPress={handleLogin} disabled={isLoading}>
        {isLoading ? (
          <ActivityIndicator color="white" />
        ) : (
          <ButtonText>Acessar</ButtonText>
        )}
      </LoginButton>

      {biometricEnabled && (
        <BiometricButton onPress={handleBiometricLogin} disabled={isLoading}>
          {isLoading ? (
            <ActivityIndicator color="white" />
          ) : (
            <ButtonText>Entrar com Biometria</ButtonText>
          )}
        </BiometricButton>
      )}

      <ForgotPassword onPress={handleForgotPassword}>
        Esqueceu sua senha?
      </ForgotPassword>

      <RegisterLink onPress={handleRegister}>
        Não tem conta? Criar conta
      </RegisterLink>
    </Container>
  );
};

export default BiometricLogin;