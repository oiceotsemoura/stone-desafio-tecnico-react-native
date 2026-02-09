import React from 'react';
import { ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRegister } from './use-register';
import * as S from './register.styles';

export const RegisterScreen: React.FC = () => {
  const {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleRegister,
    handleGoToLogin,
  } = useRegister();

  return (
    <S.Container>
      <KeyboardAvoidingView
        behavior={Platform.OS === 'ios' ? 'padding' : 'height'}
        style={{ flex: 1 }}
      >
        <S.ScrollContainer
          contentContainerStyle={{ flexGrow: 1 }}
          keyboardShouldPersistTaps="handled"
        >
          <S.Content>
            <S.Title>Criar Conta</S.Title>
            <S.Subtitle>Preencha seus dados para começar</S.Subtitle>

            <S.InputGroup>
              <S.Label>Nome Completo</S.Label>
              <S.Input
                placeholder="Digite seu nome completo"
                value={formData.fullName}
                onChangeText={(text) => handleInputChange('fullName', text)}
                hasError={!!errors.fullName}
                autoCapitalize="words"
                editable={!isLoading}
              />
              {errors.fullName && <S.ErrorText>{errors.fullName}</S.ErrorText>}
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Email</S.Label>
              <S.Input
                placeholder="Digite seu email"
                value={formData.email}
                onChangeText={(text) => handleInputChange('email', text)}
                hasError={!!errors.email}
                keyboardType="email-address"
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              {errors.email && <S.ErrorText>{errors.email}</S.ErrorText>}
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Senha</S.Label>
              <S.Input
                placeholder="Digite sua senha"
                value={formData.password}
                onChangeText={(text) => handleInputChange('password', text)}
                hasError={!!errors.password}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              {errors.password && <S.ErrorText>{errors.password}</S.ErrorText>}
            </S.InputGroup>

            <S.InputGroup>
              <S.Label>Confirmar Senha</S.Label>
              <S.Input
                placeholder="Confirme sua senha"
                value={formData.confirmPassword}
                onChangeText={(text) => handleInputChange('confirmPassword', text)}
                hasError={!!errors.confirmPassword}
                secureTextEntry
                autoCapitalize="none"
                autoCorrect={false}
                editable={!isLoading}
              />
              {errors.confirmPassword && <S.ErrorText>{errors.confirmPassword}</S.ErrorText>}
            </S.InputGroup>

            <S.RegisterButton onPress={handleRegister} disabled={isLoading}>
              <S.RegisterButtonText>
                {isLoading ? 'Criando conta...' : 'Criar Conta'}
              </S.RegisterButtonText>
            </S.RegisterButton>

            <S.LoginLink onPress={handleGoToLogin} disabled={isLoading}>
              <S.LoginLinkText>
                Já tem uma conta? <S.LoginLinkHighlight>Faça login</S.LoginLinkHighlight>
              </S.LoginLinkText>
            </S.LoginLink>
          </S.Content>
        </S.ScrollContainer>
      </KeyboardAvoidingView>

      {isLoading && (
        <S.LoadingContainer>
          <ActivityIndicator size="large" color="#0fb14c" />
        </S.LoadingContainer>
      )}
    </S.Container>
  );
};

export default RegisterScreen;
