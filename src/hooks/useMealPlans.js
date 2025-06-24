import { useEffect, useState } from 'react';
import { getAllMealPlans } from '../api/mealplans/mealplans.api';
import { handleApiError } from '../utils/handleApiError';

export const useMealPlans = () => {
  const [mealPlans, setMealPlans] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const fetchMealPlans = async () => {
    try {
      const data = await getAllMealPlans();
      setMealPlans(data);
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

  return { mealPlans, loading, error };
};
