import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoint';

export const getAllTestimonial = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.TESTIMONIALS);
  return response.data.data;
};



