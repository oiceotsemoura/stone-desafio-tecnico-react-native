import React, { useState } from 'react';
import { Alert, ActivityIndicator, KeyboardAvoidingView, Platform } from 'react-native';
import { useRouter } from 'expo-router';
import { UserService } from '../../services';
import { registerSchema, RegisterFormData } from './register.validator';
import * as S from './register.styles';

export const RegisterScreen: React.FC = () => {
  const router = useRouter();
  const [formData, setFormData] = useState<RegisterFormData>({
    email: '',
    fullName: '',
    password: '',
    confirmPassword: '',
  });
  const [errors, setErrors] = useState<Partial<Record<keyof RegisterFormData, string>>>({});
  const [isLoading, setIsLoading] = useState(false);

  const handleInputChange = (field: keyof RegisterFormData, value: string) => {
    setFormData(prev => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors(prev => {
        const newErrors = { ...prev };
        delete newErrors[field];
        return newErrors;
      });
    }
  };

  const validateForm = (): boolean => {
    try {
      registerSchema.parse(formData);
      setErrors({});
      return true;
    } catch (error: any) {
      const fieldErrors: Partial<Record<keyof RegisterFormData, string>> = {};
      if (error.issues) {
        error.issues.forEach((err: any) => {
          const field = err.path[0] as keyof RegisterFormData;
          fieldErrors[field] = err.message;
        });
      }
      setErrors(fieldErrors);
      return false;
    }
  };

  const handleRegister = async () => {
    if (!validateForm()) {
      return;
    }

    setIsLoading(true);
    try {
      const result = await UserService.registerUser({
        email: formData.email,
        fullName: formData.fullName,
        password: formData.password,
      });

      if (result.success) {
        Alert.alert(
          'Sucesso!',
          'Conta criada com sucesso. Faça login para continuar.',
          [
            {
              text: 'OK',
              onPress: () => router.replace('/login'),
            },
          ]
        );
      } else {
        Alert.alert('Erro', result.message || 'Erro ao criar conta');
      }
    } catch (error) {
      Alert.alert('Erro', 'Ocorreu um erro ao criar sua conta');
    } finally {
      setIsLoading(false);
    }
  };

  const handleGoToLogin = () => {
    router.replace('/login');
  };

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
