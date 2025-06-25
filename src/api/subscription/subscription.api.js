import axiosInstance from "../axiosInstance";
import { API_ENDPOINTS } from "../endpoint";

export const createSubscription = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.SUBSCRIPTIONS, data);
  return response.data;
};