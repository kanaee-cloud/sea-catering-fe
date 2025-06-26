import { useEffect, useState } from 'react';
import { createTestimonial, getAllTestimonial } from '../api/testimonials/testimonials.plan';
import { handleApiError } from '../utils/handleApiError';

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

  useEffect(() => {
    fetchTestimonials();
  }, []);

  return { testimonials, loading, error, postTestimonial };
};
