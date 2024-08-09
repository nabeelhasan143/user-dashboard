import { login, register } from './authService';
import apiClient from './httpService';

jest.mock('./httpService');

describe('authService', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  describe('login', () => {
    it('should return data when login is successful', async () => {
      const mockData = { token: 'mockToken' }
      const result = await login('test@example.com', 'password');

      expect(result).toEqual(mockData);
      expect(apiClient.post).toHaveBeenCalledWith('/login', {
        email: 'test@example.com',
        password: 'password',
      });
    });

    it('should throw an error when login fails', async () => {
      await expect(login('test@example.com', 'password')).rejects.toThrow(
        'Login failed'
      );
      expect(apiClient.post).toHaveBeenCalledWith('/login', {
        email: 'test@example.com',
        password: 'password',
      });
    });
  });

  describe('register', () => {
    it('should return data when registration is successful', async () => {
      const mockData = { id: 'mockId', token: 'mockToken' };
      const result = await register('test@example.com', 'password');

      expect(result).toEqual(mockData);
      expect(apiClient.post).toHaveBeenCalledWith('/register', {
        email: 'test@example.com',
        password: 'password',
      });
    });

    it('should throw an error when registration fails', async () => {
      const mockError = new Error('Registration failed');

      await expect(register('test@example.com', 'password')).rejects.toThrow(
        'Registration failed'
      );
      expect(apiClient.post).toHaveBeenCalledWith('/register', {
        email: 'test@example.com',
        password: 'password',
      });
    });
  });
});
