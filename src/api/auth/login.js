import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const login = async (formData) => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.AUTH}/login`, formData);
  return response.data;
};
