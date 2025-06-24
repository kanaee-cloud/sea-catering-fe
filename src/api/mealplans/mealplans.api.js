import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoint';

export const getAllMealPlans = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.MEALPLANS);
  return response.data.data;
};

export const getMealPlanById = async (id) => {
  const response = await axiosInstance.get(`${API_ENDPOINTS.MEALPLANS}/${id}`);
  return response.data;
};


