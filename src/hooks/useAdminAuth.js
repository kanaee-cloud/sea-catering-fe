import { adminLogin, adminLogout, adminMe } from "../api/auth/adminAuth";
import { useAdminAuthStore } from "../stores/adminAuthStore";
import { useEffect } from "react";

export const useAdminAuth = () => {
  const { admin, token, setAdmin, setToken, clearAuth } = useAdminAuthStore();

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

  useEffect(() => {
    if (token && !admin) {
      fetchAdmin();
    }
  }, [token, admin]);

  return {
    handleAdminLogin,
    handleAdminLogout,
    fetchAdmin,
    token,
    admin,
  };
};
