import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const users = async () => {
    const response = await axiosInstance.get(`${API_ENDPOINTS.USERS}/me`);
    return response.data;
}

export const pauseSubscription = async ({ subscriptionId, pauseStart, pauseEnd = null }) => {
  const res = await axiosInstance.patch(`${API_ENDPOINTS.SUBSCRIPTIONS}/pause`, {
    subscriptionId,
    pauseStart,
    pauseEnd,
  });
  return res.data;
};

export const resumeSubscription = async (subscriptionId) => {
  const res = await axiosInstance.patch(`${API_ENDPOINTS.SUBSCRIPTIONS}/resume`, {
    subscriptionId,
  });
  return res.data;
};

export const cancelSubscription = async (subscriptionId) => {
  const res = await axiosInstance.patch(`${API_ENDPOINTS.SUBSCRIPTIONS}/cancel`, {
    subscriptionId,
  });
  return res.data;
};