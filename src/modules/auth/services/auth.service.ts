import { UserService } from './user.service';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface AuthResult {
  success: boolean;
  message?: string;
  token?: string;
  user?: {
    email: string;
    fullName: string;
  };
}

export const loginWithCredentials = async (
  credentials: LoginCredentials,
): Promise<AuthResult> => {
  const mockRequest = new Promise<void>((resolve) => {
    const delay = Math.random() * 1000 + 500;
    setTimeout(resolve, delay);
  });

  const timeout = new Promise<never>((_, reject) =>
    setTimeout(() => reject(new Error("Tempo de requisição excedido")), 5000),
  );

  try {
    await Promise.race([mockRequest, timeout]);

    if (credentials.email === 'server@error.com') {
      return { success: false, message: "Erro interno do servidor" };
    }

    if (credentials.email === 'user@test.com' && credentials.password === 'Test#123') {
      const mockToken = `token_user@test.com_${Date.now()}`;
      return {
        success: true,
        token: mockToken,
        user: {
          email: 'user@test.com',
          fullName: 'Test User',
        }
      };
    }

    const user = await UserService.validateCredentials(credentials.email, credentials.password);
    
    if (user) {
      const mockToken = `token_${user.email}_${Date.now()}`;
      return { 
        success: true, 
        token: mockToken,
        user: {
          email: user.email,
          fullName: user.fullName,
        }
      };
    }

    return { success: false, message: "Email ou senha inválidos" };
  } catch (error) {
    return { success: false, message: "Tempo de requisição excedido" };
  }
};
