/* eslint-disable no-unused-vars */
import {
  adminCancelSubscription,
  adminDashboard,
  adminLogin,
  adminLogout,
  adminMe,
  adminPauseSubscription,
  adminResumeSubscription,
  userList,
} from "../api/auth/admin";
import { useAdminAuthStore } from "../stores/adminAuthStore";
import { useEffect, useState } from "react";

export const useAdminAuth = () => {
  const { admin, token, setAdmin, setToken, clearAuth } = useAdminAuthStore();
  const [dashboard, setDashboard] = useState(null);
  const [userListData, setUserListData] = useState(null);

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

  const fetchAdminDashboard = async (dateFilter) => {
    try {
      const res = await adminDashboard(dateFilter);
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

  const getAllUserList = async () => {
    try {
      const res = await userList();
      setUserListData(res.data);
      console.log("User list fetched:", res.data);
    } catch (err) {
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch user list",
      };
    }
  };

  const handlePauseSubscription = async (
    subscriptionId,
    pauseStart,
    pauseEnd
  ) => {
    try {
      await adminPauseSubscription(subscriptionId, pauseStart, pauseEnd);
      await getAllUserList(); // refresh data
    } catch (err) {
      console.error("Pause failed", err);
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    try {
      await adminCancelSubscription(subscriptionId);
      await getAllUserList(); // refresh data
    } catch (err) {
      console.error("Cancel failed", err);
    }
  };

  const handleResumeSubscription = async (subscriptionId) => {
    try {
      await adminResumeSubscription(subscriptionId);
      await getAllUserList(); // refresh data
    } catch (err) {
      console.error("Resume failed", err);
    }
  };

  const getDefaultDateRange = () => {
    const today = new Date();
    const start = new Date(today.getFullYear(), today.getMonth(), 1);
    const end = today;
    return {
      startDate: start.toISOString().split("T")[0],
      endDate: end.toISOString().split("T")[0],
    };
  };

  useEffect(() => {
    if (token && !admin) {
      fetchAdmin();
    }
  }, [token, admin]);

  useEffect(() => {
    if (admin) {
      const { startDate, endDate } = getDefaultDateRange();
      fetchAdminDashboard({ startDate, endDate });
      getAllUserList();
    }
  }, [admin]);

  return {
    handleAdminLogin,
    handleAdminLogout,
    fetchAdmin,
    fetchAdminDashboard,
    token,
    admin,
    dashboard,
    userListData,
    handlePauseSubscription,
    handleCancelSubscription,
    handleResumeSubscription,
  };
};
