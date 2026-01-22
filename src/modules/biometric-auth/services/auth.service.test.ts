import { loginWithCredentials } from './auth.service';

describe('Auth Service', () => {
  beforeEach(() => {
    jest.clearAllTimers();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  describe('loginWithCredentials', () => {
    it('returns success for valid credentials', async () => {
      const result = await loginWithCredentials({
        email: 'user@test.com',
        password: 'Test#123',
      });

      expect(result.success).toBe(true);
      expect(result.token).toBeDefined();
      expect(result.message).toBeUndefined();
    });

    it('returns 401 error for error@test.com', async () => {
      const result = await loginWithCredentials({
        email: 'error@test.com',
        password: 'anyPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid email or password');
      expect(result.token).toBeUndefined();
    });

    it('returns 500 error for server@error.com', async () => {
      const result = await loginWithCredentials({
        email: 'server@error.com',
        password: 'anyPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Internal server error');
      expect(result.token).toBeUndefined();
    });

    it('returns 401 error for invalid credentials', async () => {
      const result = await loginWithCredentials({
        email: 'invalid@test.com',
        password: 'wrongPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid email or password');
      expect(result.token).toBeUndefined();
    });

    it('returns 401 error for wrong password with valid email format', async () => {
      const result = await loginWithCredentials({
        email: 'user@test.com',
        password: 'WrongPassword',
      });

      expect(result.success).toBe(false);
      expect(result.message).toBe('Invalid email or password');
      expect(result.token).toBeUndefined();
    });
  });
});