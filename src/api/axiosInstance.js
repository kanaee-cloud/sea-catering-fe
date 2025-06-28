import axios from 'axios';
import { useUserAuthStore } from '../stores/userAuthStore';
import { useAdminAuthStore } from '../stores/adminAuthStore';

const axiosInstance = axios.create({
  baseURL: import.meta.env.VITE_API_URL,
  withCredentials: true,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const adminToken = useAdminAuthStore.getState().token;
    const userToken = useUserAuthStore.getState().token;
    
    const token = adminToken || userToken;
    
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => Promise.reject(error)
);

let isRefreshing = false;

axiosInstance.interceptors.response.use(
  (res) => res,
  async (err) => {
    const originalRequest = err.config;

    if (
      err.response?.status === 401 &&
      !originalRequest._retry &&
      !isRefreshing
    ) {
      originalRequest._retry = true;
      isRefreshing = true;

      try {
        const res = await axiosInstance.get('/auth/refresh-token');
        const newToken = res.data.accessToken;

        // Determine which store to update based on current token
        const adminToken = useAdminAuthStore.getState().token;
        const userToken = useUserAuthStore.getState().token;

        if (adminToken) {
          useAdminAuthStore.getState().setToken(newToken);
        } else if (userToken) {
          useUserAuthStore.getState().setToken(newToken);
        }

        axiosInstance.defaults.headers.common["Authorization"] = `Bearer ${newToken}`;
        originalRequest.headers["Authorization"] = `Bearer ${newToken}`;

        return axiosInstance(originalRequest);
      } catch (refreshError) {
        // Clear both auth stores on refresh failure
        useUserAuthStore.getState().clearAuth(); 
        useAdminAuthStore.getState().clearAuth();
        return Promise.reject(refreshError);
      } finally {
        isRefreshing = false;
      }
    }

    return Promise.reject(err);
  }
);

export default axiosInstance;