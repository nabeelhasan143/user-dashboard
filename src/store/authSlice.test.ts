import authReducer, { login, logout } from '../store/authSlice';

describe('authSlice', () => {
  const initialState = {
    isAuthenticated: false,
    token: null,
  };

  it('should handle loginSuccess', () => {
    const token = 'QpwL5tke4Pnpja7X4';
    const expectedState = {
      isAuthenticated: true,
      token,
    };

    expect(authReducer(initialState, login(token))).toEqual(expectedState);
  });

  it('should handle logout', () => {
    const authenticatedState = {
      isAuthenticated: true,
      token: 'QpwL5tke4Pnpja7X4',
    };

    expect(authReducer(authenticatedState, logout())).toEqual(initialState);
  });
});
