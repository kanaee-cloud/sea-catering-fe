import { Navigate } from 'react-router-dom';
import { useRoleGuard } from '../utils/roleGuard';


export const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false }) => {
  const { isAdmin, isUser } = useRoleGuard();

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/auth/admin" replace />;
  }

  if (requireUser && !isUser()) {
    return <Navigate to="/auth" replace />;
  }

  if (!requireAdmin && !requireUser && !isAdmin() && !isUser()) {
    return <Navigate to="/auth" replace />;
  }

  return children;
};