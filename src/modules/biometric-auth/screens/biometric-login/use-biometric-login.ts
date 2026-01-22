import { useState } from 'react';
import { useAuthStore } from '../../store';
import { loginSchema, LoginFormData } from './schema.validator';

export const useBiometricLogin = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [errors, setErrors] = useState<Partial<LoginFormData>>({});

  const { login, loginWithBiometrics, isLoading, error } = useAuthStore();

  const handleLogin = async () => {
    const validation = loginSchema.safeParse({ email, password });
    if (!validation.success) {
      const fieldErrors: Partial<LoginFormData> = {};
      validation.error.issues.forEach((issue) => {
        if (issue.path[0] === 'email') fieldErrors.email = issue.message;
        if (issue.path[0] === 'password') fieldErrors.password = issue.message;
      });
      setErrors(fieldErrors);
      return;
    }
    setErrors({});
    await login({ email, password });
  };

  const handleBiometricLogin = async () => {
    await loginWithBiometrics();
  };

  const clearSensitiveData = () => {
    setEmail('');
    setPassword('');
    setErrors({});
  };

  return {
    email,
    setEmail,
    password,
    setPassword,
    errors,
    isLoading,
    error,
    handleLogin,
    handleBiometricLogin,
    clearSensitiveData,
  };
};