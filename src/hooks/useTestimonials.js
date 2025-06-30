// hooks/useTestimonials.js
import { useEffect, useState } from 'react';
import {
  createTestimonial,
  getAllTestimonial,
  deleteTestimonial as deleteTestimonialApi
} from '../api/testimonials/testimonials.plan';
import { handleApiError } from '../utils/handleApiError';
import { toast } from 'react-toastify';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchTestimonials = async () => {
    try {
      const data = await getAllTestimonial();
      setTestimonials(data);
    } catch (err) {
      const apiErr = handleApiError(err);
      setError(apiErr.message);
    } finally {
      setLoading(false);
    }
  };

  const postTestimonial = async (formData) => {
    try {
      const newTestimonial = await createTestimonial(formData);
      setTestimonials((prev) => [newTestimonial, ...prev]);
      return { success: true };
    } catch (err) {
      const apiErr = handleApiError(err);
      return { success: false, message: apiErr.message };
    }
  };

  const deleteTestimonial = async (id) => {
    try {
      await deleteTestimonialApi(id);
      setTestimonials((prev) => prev.filter((t) => t.id !== id));
      toast.success('Testimonial deleted successfully!');
      return { success: true };
    } catch (err) {
      const apiErr = handleApiError(err);
      return { success: false, message: apiErr.message };
    }
  };

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return {
    testimonials,
    loading,
    error,
    postTestimonial,
    deleteTestimonial
  };
};
