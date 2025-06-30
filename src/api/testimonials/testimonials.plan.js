import axiosInstance from '../axiosInstance';
import { API_ENDPOINTS } from '../endpoint';

export const getAllTestimonial = async () => {
  const response = await axiosInstance.get(API_ENDPOINTS.TESTIMONIALS);
  return response.data.data;
};

export const createTestimonial = async (data) => {
  const response = await axiosInstance.post(API_ENDPOINTS.TESTIMONIALS, data);
  return response.data.data;
}

export const deleteTestimonial = async (id) => {
  const response = await axiosInstance.delete(`/admin/${API_ENDPOINTS.TESTIMONIALS}/${id}`);
  return response.data.data;
}

