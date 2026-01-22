export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  token?: string;
}

// Mock login function
export const loginWithCredentials = async (credentials: LoginCredentials): Promise<AuthResult> => {
  const mockRequest = new Promise<void>((resolve) => {
    // Simulate network latency: 1-2 seconds
    const delay = Math.random() * 1000 + 1000; // 1000 to 2000 ms
    setTimeout(resolve, delay);
  });

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error('Request timeout')), 5000)
  );

  try {
    await Promise.race([mockRequest, timeout]);

    // ✅ Login bem-sucedido: user@test.com + Test#123
    if (credentials.email === 'user@test.com' && credentials.password === 'Test#123') {
      const mockToken = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJzdWIiOiIxMjM0NTY3ODkwIiwibmFtZSI6IkpvaG4gRG9lIiwiaWF0IjoxNTE2MjM5MDIyfQ.SflKxwRJSMeKKF2QT4fwpMeJf36POk6yJV_adQssw5c';
      return { success: true, token: mockToken };
    }

    // ❌ Erro 401: error@test.com + qualquer senha
    if (credentials.email === 'error@test.com') {
      return { success: false, message: 'Invalid email or password' };
    }

    // ❌ Erro 500: server@error.com + qualquer senha
    if (credentials.email === 'server@error.com') {
      return { success: false, message: 'Internal server error' };
    }

    // Para qualquer outra combinação, retorna erro 401
    return { success: false, message: 'Invalid email or password' };
  } catch (error) {
    return { success: false, message: 'Request timeout' };
  }
};