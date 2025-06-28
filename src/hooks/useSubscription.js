import { useState } from "react";
import { createSubscription } from "../api/subscription/subscription.api";
import { useUserAuth } from "./useUserAuth";

export const useSubscription = () => {
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const { fetchUser } = useUserAuth();

  const submitSubscription = async (formData) => {
    setLoading(true);
    setError(null);

    try {
      const res = await createSubscription(formData);
      await fetchUser();
      return { success: true, data: res.data };
    } catch (err) {
      setError(err.response?.data?.message || "Something went wrong");
      return {
        success: false,
        message: err.response?.data?.message || "Failed to create subscription",
      };
    } finally {
      setLoading(false);
    }
  };

  return { submitSubscription, loading, error };
};
