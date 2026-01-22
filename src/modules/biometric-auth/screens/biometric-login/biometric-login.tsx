import React from 'react';
import { ActivityIndicator, Alert } from 'react-native';
import { useBiometricLogin } from './use-biometric-login';
import { useAuthStore } from '../../store';
import {
  Container,
  Title,
  Input,
  ErrorText,
  LoginButton,
  BiometricButton,
  ButtonText,
  ForgotPassword,
} from './biometric-login.styles';

const BiometricLogin: React.FC = () => {
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

  return (
    <Container>
      <Title>Login</Title>

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
    </Container>
  );
};

export default BiometricLogin;