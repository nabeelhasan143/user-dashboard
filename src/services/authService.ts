import apiClient from './httpService';

export const login = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/login', { email, password });
    console.log('Login Response:', response.data); // Log response
    return response.data;
  } catch (error) {
    throw error;
  }
};

export const register = async (email: string, password: string) => {
  try {
    const response = await apiClient.post('/register', { email, password });
    console.log('Register Response:', response.data); // Log response
    return response.data;
  } catch (error) {
    throw error;
  }
};


