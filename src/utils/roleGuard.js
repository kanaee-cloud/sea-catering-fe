import { useUserAuthStore } from "../stores/userAuthStore";
import { useAdminAuthStore } from "../stores/adminAuthStore";

export const useRoleGuard = () => {
  const userAuth = useUserAuthStore();
  const adminAuth = useAdminAuthStore();

  const isUser = () => {
    return userAuth.token && userAuth.user?.role === 'USER';
  };

  const isAdmin = () => {
    console.log("User from role guard", adminAuth);
    return adminAuth.token && adminAuth.admin?.role === 'ADMIN';
  };

  const getCurrentUser = () => {
    if (isAdmin()) {
      return { user: adminAuth.admin, type: 'admin' };
    }
    if (isUser()) {
      return { user: userAuth.user, type: 'user' };
    }
    return null;
  };

  const logout = () => {
    userAuth.clearAuth();
    adminAuth.clearAuth();
  };

  return {
    isUser,
    isAdmin,
    getCurrentUser,
    logout,
  };
};