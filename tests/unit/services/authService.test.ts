import { AuthService } from '../../../server/src/services/authService.js';

describe('TEST SUITE 2: Authentication Service', () => {
  test('Generates valid JWT access and refresh tokens', () => {
    const userId = 'user_test_12345';
    const accessToken = AuthService.generateAccessToken(userId);
    const refreshToken = AuthService.generateRefreshToken(userId);

    expect(accessToken).toBeDefined();
    expect(typeof accessToken).toBe('string');
    expect(refreshToken).toBeDefined();

    const decoded = AuthService.verifyAccessToken(accessToken);
    expect(decoded.userId).toBe(userId);
  });
});
