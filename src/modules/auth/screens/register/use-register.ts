import { useState } from 'react';
import { Alert } from 'react-native';
import { useRouter } from 'expo-router';
import { UserService } from '../../services';
import { registerSchema, RegisterFormData } from './register.validator';

export const useRegister = () => {
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

  return {
    formData,
    errors,
    isLoading,
    handleInputChange,
    handleRegister,
    handleGoToLogin,
  };
};
