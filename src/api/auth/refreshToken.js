import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const refreshToken = async () => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.AUTH}/refresh-token`);
  return response.data;
}

