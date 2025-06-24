import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const users = async () => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.USERS}/me`);
    return response.data;
}