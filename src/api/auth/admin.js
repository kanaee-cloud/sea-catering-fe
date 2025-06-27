import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const adminLogin = async (formData) => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.AUTH_ADMIN}/login`, formData);
  return response.data;
};

export const adminMe = async () => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.ADMIN}/me`);
  return response.data;
};

export const adminDashboard = async () => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.ADMIN}/dashboard`);
  return response.data;
};

export const adminLogout = async () => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.AUTH_ADMIN}/logout`);
  return response.data;
};