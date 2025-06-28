import { login } from "../api/auth/login";
import { register } from "../api/auth/register";
import { cancelSubscription, users as getUser, pauseSubscription, resumeSubscription } from "../api/auth/users";
import { logout as logoutApi } from "../api/auth/logout";
import { useUserAuthStore } from "../stores/userAuthStore";
import { useEffect } from "react";
import { toast } from "react-toastify";

export const useUserAuth = () => {
  const { user, token, setUser, setToken, clearAuth } = useUserAuthStore();

  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);

      setToken(res.token); 
      const profileRes = await getUser();
      setUser(profileRes.details.user);
      toast.success("Login successful!");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Login failed");
      return {
        success: false,
        message: err.response?.data?.message || "Login failed",
        details: err.response?.data?.details || [],
      };
    }
  };

  const handleRegister = async (formData) => {
    try {
      const res = await register(formData);
      toast.success(res.message || "Register successful!");
      return { success: true, message: res.message };
    } catch (err) {
      toast.error(err.response?.data?.message || "Register failed");
      return {
        success: false,
        message: err.response?.data?.message || "Register failed",
        details: err.response?.data?.details || [],
      };
    }
  };

  const handleLogout = async () => {
    try {
      await logoutApi(); 
       toast.success("Logout successful!");
    } catch (err) {
       toast.error("Logout failed");
      console.error("Logout failed:", err);
    } finally {
      clearAuth(); 
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res.details.user);
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      clearAuth(); 
    }
  };

  const handlePause = async (subscriptionId) => {
  try {
    const pauseStart = new Date().toISOString();
    const res = await pauseSubscription({ subscriptionId, pauseStart });
    await fetchUser();
    toast.success(res.message || "Subscription paused.");
    return { success: true, message: res.message };
  } catch (err) {
    toast.error(err.response?.data?.message || "Failed to pause subscription");
    return {
      success: false,
      message: err.response?.data?.message || "Failed to pause subscription",
    };
  }
};

const handleResume = async (subscriptionId) => {
  try {
    const res = await resumeSubscription(subscriptionId);
    await fetchUser();
    toast.success(res.message || "Subscription resumed.");
    return { success: true, message: res.message };
  } catch (err) {
     toast.error(err.response?.data?.message || "Failed to resume subscription");
    return {
      success: false,
      message: err.response?.data?.message || "Failed to resume subscription",
    };
  }
};

  const handleCancel = async (subscriptionId) => {
    try {
      const res = await cancelSubscription(subscriptionId);
      await fetchUser();
      toast.success(res.message || "Subscription canceled.");
      return { success: true, message: res.message };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel subscription");
      return {
        success: false,
        message: err.response?.data?.message || "Failed to cancel subscription",
      };
    }
  };

   useEffect(() => {
    if (token && !user) {
      fetchUser();
    }
  }, [token, user]);

  return {
    handleLogin,
    handleRegister,
    handleLogout,
    fetchUser,
    token,
    user,
    handlePause,
    handleResume,
    handleCancel
  };
};
