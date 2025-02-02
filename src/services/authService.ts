import axios from 'axios';

const API_URL = import.meta.env.VITE_API_URL;

export const axiosInstance = axios.create({
  baseURL: API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401 || error.response?.status === 403) {
      window.location.href = '/';
    }
    return Promise.reject(error);
  }
);

export const authService = {
  async signup(username: string, email: string, password: string) {
    const response = await axiosInstance.post('/auth/signup', { username, email, password });
    return response.data;
  },

  async login(email: string, password: string) {
    const response = await axiosInstance.post('/auth/login', { email, password });
    return response.data;
  },

  async logout() {
    await axiosInstance.post('/auth/logout');
  },

  async getProfile() {
    const response = await axiosInstance.get('/auth/profile');
    return response.data;
  },
};
