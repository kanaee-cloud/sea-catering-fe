import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const register = async (payload) => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.AUTH}/register`, payload);
  return response.data;
};