// useCombinedAuth.js
import { useAuth } from "./useUserAuth";
import { useAdminAuth } from "./useAdminAuth";

export const useCombinedAuth = () => {
  const {
    user,
    token: userToken,
    handleLogout: userLogout,
    ...userMethods
  } = useAuth();
  const {
    admin,
    token: adminToken,
    handleAdminLogout: adminLogout,
    ...adminMethods
  } = useAdminAuth();

  const currentUser = admin || user;
  const currentToken = adminToken || userToken;
  const isAuthenticated = !!(adminToken || userToken);
  const isAdmin = !!admin;
  const isUser = !!user && !admin;

  const handleLogout = async () => {
    if (isAdmin) {
      await adminLogout();
    } else {
      await userLogout();
    }
  };

  return {
    currentUser,
    currentToken,
    isAuthenticated,
    isAdmin,
    isUser,
    user,
    admin,
    userToken,
    adminToken,
    handleLogout,
    ...userMethods,
    ...adminMethods,
    role: currentUser?.role,
    userName: currentUser?.username || currentUser?.name || currentUser?.email,
  };
};
