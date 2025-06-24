import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const logout = async () => {
    const response = await axiosInstance.post(`${API_ENDPOINTS.AUTH}/logout`);
    return response.data;
};