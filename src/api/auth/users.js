import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const users = async () => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.USERS}/me`);
    return response.data;
}

export const pauseSubscription = async () => {
  const res = await axiosInstance.patch(`${API_ENDPOINTS.SUBSCRIPTIONS}/pause`);
  return res.data;
};

export const resumeSubscription = async () => {
  const res = await axiosInstance.patch(`${API_ENDPOINTS.SUBSCRIPTIONS}/resume`);
  return res.data;
};

export const cancelSubscription = async () => {
  const res = await axiosInstance.patch(`${API_ENDPOINTS.SUBSCRIPTIONS}/cancel`);
  return res.data;
};