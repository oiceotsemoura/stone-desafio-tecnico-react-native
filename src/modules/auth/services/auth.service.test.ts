import { loginWithCredentials } from './auth.service';
import { UserService } from './user.service';

jest.mock('./user.service');

describe('Auth Service', () => {
  describe('loginWithCredentials', () => {
    beforeEach(() => {
      jest.clearAllMocks();
    });

    it('returns success for valid credentials', async () => {
      (UserService.validateCredentials as jest.Mock).mockResolvedValue({
        email: 'valid@test.com',
        fullName: 'Valid User',
        password: 'Valid#123',
      });

      const result = await loginWithCredentials({
        email: 'valid@test.com',
        password: 'Valid#123',
      });

      expect(result.success).toBe(true);
      expect(result.token).toBeDefined();
      expect(result.message).toBeUndefined();
    }, 10000);

    it('returns 401 error for non-existent user', async () => {
      (UserService.validateCredentials as jest.Mock).mockResolvedValue(null);

      const result = await loginWithCredentials({
        email: 'nonexistent@test.com',
        password: 'anyPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email ou senha inválidos');
      expect(result.token).toBeUndefined();
    }, 10000);

    it('returns 500 error for server@error.com', async () => {
      const result = await loginWithCredentials({
        email: 'server@error.com',
        password: 'anyPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Erro interno do servidor');
      expect(result.token).toBeUndefined();
    }, 10000);

    it('returns 401 error for invalid password', async () => {
      (UserService.validateCredentials as jest.Mock).mockResolvedValue(null);

      const result = await loginWithCredentials({
        email: 'user@test.com',
        password: 'wrongPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email ou senha inválidos');
      expect(result.token).toBeUndefined();
    }, 10000);

    it('returns 401 error for wrong password with registered user', async () => {
      (UserService.validateCredentials as jest.Mock).mockResolvedValue(null);

      const result = await loginWithCredentials({
        email: 'registered@test.com',
        password: 'WrongPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Email ou senha inválidos');
      expect(result.token).toBeUndefined();
    }, 10000);
  });
});