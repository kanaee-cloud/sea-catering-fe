import { useEffect, useState } from 'react';
import { getAllTestimonial } from '../api/testimonials/testimonials.plan';
import { handleApiError } from '../utils/handleApiError';

export const useTestimonials = () => {
  const [testimonials, setTestimonials] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMealPlans = async () => {
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

  useEffect(() => {
    fetchMealPlans();
  }, []);

  return { testimonials, loading, error };
};
