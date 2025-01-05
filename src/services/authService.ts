import axios from 'axios';

export const API_URL = 'http://localhost:5000/api';

// Axios instance with base URL
export const axiosInstance = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
    'Authorization': `Bearer ${localStorage.getItem('token')}`,
  },
});

export const authService = {

  // Handle sign-up (user registration)
  async signup(username: string, email: string, password: string) {
    try {
      const response = await axiosInstance.post('/auth/signup', {
        username,
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error signing up');
    }
  },

  // Handle login
  async login(email: string, password: string) {
    try {
      const response = await axiosInstance.post('/auth/login', {
        email,
        password,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error logging in');
    }
  },

  // Handle refresh token 
  async refreshToken(refreshToken: string) {
    try {
      const response = await axiosInstance.post('/refresh-token', {
        refreshToken,
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error refreshing token');
    }
  },

  // Fetch user profile using token 
  async getUserProfile(token: string) {
    try {
      const response = await axiosInstance.get('/dashboard', {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      return response.data;
    } catch (error: any) {
      throw new Error(error.response?.data?.message || 'Error fetching user profile');
    }
  }

}

