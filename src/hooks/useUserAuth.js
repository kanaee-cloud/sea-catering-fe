import { login } from "../api/auth/login";
import { register } from "../api/auth/register";
import { cancelSubscription, users as getUser, pauseSubscription, resumeSubscription } from "../api/auth/users";
import { logout as logoutApi } from "../api/auth/logout";
import { useUserAuthStore } from "../stores/userAuthStore";
import { useEffect } from "react";

export const useUserAuth = () => {
  const { user, token, setUser, setToken, clearAuth } = useUserAuthStore();

  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);

      setToken(res.token); 
      const profileRes = await getUser();
      setUser(profileRes.details.user);

      return { success: true };
    } catch (err) {
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
      return { success: true, message: res.message };
    } catch (err) {
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
    } catch (err) {
      console.error("Logout failed:", err);
    } finally {
      clearAuth(); 
    }
  };

  const fetchUser = async () => {
    try {
      const res = await getUser();
      setUser(res.details.user);
      console.log("User fetched:", res.details.user); 
    // eslint-disable-next-line no-unused-vars
    } catch (err) {
      clearAuth(); 
    }
  };

  const handlePause = async () => {
  try {
    const res = await pauseSubscription();
    await fetchUser(); // refresh user state after update
    return { success: true, message: res.message };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to pause subscription",
    };
  }
};

const handleResume = async () => {
  try {
    const res = await resumeSubscription();
    await fetchUser();
    return { success: true, message: res.message };
  } catch (err) {
    return {
      success: false,
      message: err.response?.data?.message || "Failed to resume subscription",
    };
  }
};

const handleCancel = async () => {
  try {
    const res = await cancelSubscription();
    await fetchUser();
    return { success: true, message: res.message };
  } catch (err) {
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
