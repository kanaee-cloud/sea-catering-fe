// hooks/useAdminAuth.js
import { useEffect, useState, useCallback } from "react";
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
import { toast } from "react-toastify";


const formatDate = (date) => date.toISOString().split("T")[0];


const getDefaultDateRange = () => {
  const today = new Date();
  const start = new Date(today.getFullYear(), today.getMonth(), 1);
  return {
    startDate: formatDate(start),
    endDate: formatDate(today),
  };
};

export const useAdminAuth = () => {
  const { admin, token, setAdmin, setToken, clearAuth } = useAdminAuthStore();
  const [dashboard, setDashboard] = useState(null);
  const [userListData, setUserListData] = useState(null);
  const [loading, setLoading] = useState({
    dashboard: false,
    userList: false,
    subscription: false,
  });


  const handleAdminLogin = async (formData) => {
    try {
      const res = await adminLogin(formData);
      setToken(res.token);

      const profileRes = await adminMe();
      setAdmin(profileRes.details.user);
      toast.success("Admin login successful!");
      return { success: true };
    } catch (err) {
      toast.error(err.response?.data?.message || "Admin login failed");
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
      toast.success("Admin logout successful!");
    } catch (err) {
      toast.error("Admin logout failed:", err);
    } finally {
      clearAuth();
    }
  };

 
  const fetchAdmin = useCallback(async () => {
    try {
      const res = await adminMe();
      setAdmin(res.details.user);
    } catch (err) {
      console.error("Fetch admin failed:", err);
      clearAuth();
    }
  }, [setAdmin, clearAuth]);


 const fetchAdminDashboard = useCallback(
  async (startDate, endDate) => {
    setLoading((prev) => ({ ...prev, dashboard: true }));
    try {
      const res = await adminDashboard(startDate, endDate);
      setDashboard(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Fetch dashboard failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch admin dashboard",
      };
    } finally {
      setLoading((prev) => ({ ...prev, dashboard: false }));
    }
  },
  []
);


  const getAllUserList = useCallback(async () => {
    setLoading(prev => ({ ...prev, userList: true }));
    try {
      const res = await userList();
      setUserListData(res.data);
      return { success: true, data: res.data };
    } catch (err) {
      console.error("Fetch user list failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to fetch user list",
      };
    } finally {
      setLoading(prev => ({ ...prev, userList: false }));
    }
  }, []);


  const handlePauseSubscription = async (subscriptionId, pauseStart, pauseEnd) => {
    setLoading(prev => ({ ...prev, subscription: true }));
    try {
      await adminPauseSubscription(subscriptionId, pauseStart, pauseEnd);
      await getAllUserList();
      toast.success("Subscription paused successfully!");
      return { success: true, message: "Subscription paused successfully" };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to pause subscription");
      console.error("Pause subscription failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to pause subscription",
      };
    } finally {
      setLoading(prev => ({ ...prev, subscription: false }));
    }
  };

  const handleCancelSubscription = async (subscriptionId) => {
    setLoading(prev => ({ ...prev, subscription: true }));
    try {
      await adminCancelSubscription(subscriptionId);
      await getAllUserList();
      toast.success("Subscription cancelled successfully!");
      return { success: true, message: "Subscription cancelled successfully" };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to cancel subscription");
      console.error("Cancel subscription failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to cancel subscription",
      };
    } finally {
      setLoading(prev => ({ ...prev, subscription: false }));
    }
  };

  const handleResumeSubscription = async (subscriptionId) => {
    setLoading(prev => ({ ...prev, subscription: true }));
    try {
      await adminResumeSubscription(subscriptionId);
      await getAllUserList();
      toast.success("Subscription resumed successfully!");
      return { success: true, message: "Subscription resumed successfully" };
    } catch (err) {
      toast.error(err.response?.data?.message || "Failed to resume subscription");
      console.error("Resume subscription failed:", err);
      return {
        success: false,
        message: err.response?.data?.message || "Failed to resume subscription",
      };
    } finally {
      setLoading(prev => ({ ...prev, subscription: false }));
    }
  };


  useEffect(() => {
    if (token && !admin) {
      fetchAdmin();
    }
  }, [token, admin, fetchAdmin]);


  useEffect(() => {
    if (admin) {
      fetchAdminDashboard();
      getAllUserList();
    }
  }, [admin, fetchAdminDashboard, getAllUserList]);

  return {

    handleAdminLogin,
    handleAdminLogout,
    fetchAdmin,
    token,
    admin,


    fetchAdminDashboard,
    dashboard,


    getAllUserList,
    userListData,


    handlePauseSubscription,
    handleCancelSubscription,
    handleResumeSubscription,


    loading,


    getDefaultDateRange,
    formatDate,
  };
};