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

export const adminDashboard = async (startDate, endDate) => {
  let query = "";
  if (startDate && endDate) {
    query = `?startDate=${startDate}&endDate=${endDate}`;
  }
  const res = await axiosInstance.get(`${API_ENDPOINTS.ADMIN}/dashboard${query}`);
  return res.data;
};

export const adminLogout = async () => {
  const response = await axiosInstance.post(`${API_ENDPOINTS.AUTH_ADMIN}/logout`);
  return response.data;
};

export const userList = async () => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.ADMIN}/user/list`);
  return response.data;
}

export const adminPauseSubscription = async (subscriptionId, pauseStart, pauseEnd = null) => {
  const response = await axiosInstance.patch(`${API_ENDPOINTS.ADMIN}/subscription/pause`, {
    subscriptionId,
    pauseStart,
    pauseEnd,
  });
  return response.data;
};


export const adminCancelSubscription = async (subscriptionId) => {
  const response = await axiosInstance.patch(`${API_ENDPOINTS.ADMIN}/subscription/cancel`, {
    subscriptionId,
  });
  return response.data;
};

export const adminResumeSubscription = async (subscriptionId) => {
  const response = await axiosInstance.patch(`${API_ENDPOINTS.ADMIN}/subscription/resume`, {
    subscriptionId,
  });
  return response.data;
};

