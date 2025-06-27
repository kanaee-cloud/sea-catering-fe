/* eslint-disable no-unused-vars */
import {
  adminDashboard,
  adminLogin,
  adminLogout,
  adminMe,
} from "../api/auth/admin";
import { useAdminAuthStore } from "../stores/adminAuthStore";
import { useEffect, useState } from "react";

export const useAdminAuth = () => {
  const { admin, token, setAdmin, setToken, clearAuth } = useAdminAuthStore();
  const [ dashboard, setDashboard ] = useState(null);

  const handleAdminLogin = async (formData) => {
    try {
      const res = await adminLogin(formData);

      setToken(res.token);

      const profileRes = await adminMe();
      setAdmin(profileRes.details.user);

      return { success: true };
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Admin login failed",
        details: err.response?.data?.details || [],
      };
    }
  };

  const handleAdminLogout = async () => {
    try {
      await adminLogout();
    } catch (err) {
      console.error("Admin logout failed:", err);
    } finally {
      clearAuth();
    }
  };

  const fetchAdmin = async () => {
    try {
      const res = await adminMe();
      setAdmin(res.details.user);
      console.log("Admin fetched:", res.details.user);
    } catch (err) {
      console.error("Fetch admin failed:", err);
      clearAuth();
    }
  };

  const fetchAdminDashboard = async () => {
    try {
      const res = await adminDashboard();
      setDashboard(res.data);
      console.log("Admin dashboard fetched:", res.data);
      return { success: true, data: res.data };
    } catch (err) {
      return {
        success: false,
        message:
          err.response?.data?.message || "Failed to fetch admin dashboard",
      };
    }
  };

  useEffect(() => {
    if (token && !admin) {
      fetchAdmin();
    }
  }, [token, admin]);

   useEffect(() => {
    if (admin) {
      fetchAdminDashboard(); 
    }
  }, [admin]);

  return {
    handleAdminLogin,
    handleAdminLogout,
    fetchAdmin,
    fetchAdminDashboard,
    token,
    admin,
    dashboard
  };
};
