import { login } from "../api/auth/login";
import { register } from "../api/auth/register";
import { users as getUser } from "../api/auth/users";
import { logout as logoutApi } from "../api/auth/logout";
import { useUserAuthStore } from "../stores/userAuthStore";
import { useEffect } from "react";

export const useAuth = () => {
  const { user, token, setUser, setToken, clearAuth } = useUserAuthStore();

  const handleLogin = async (formData) => {
    try {
      const res = await login(formData);

      const decoded = JSON.parse(atob(res.token.split(".")[1]));

      setToken(res.token); 
      setUser({
        id: decoded.userId,
        role: decoded.role,
      });

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
  };
};
