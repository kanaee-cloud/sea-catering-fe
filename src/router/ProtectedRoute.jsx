import { Navigate } from 'react-router-dom';
import { useRoleGuard } from '../utils/roleGuard';

export const ProtectedRoute = ({ children, requireAdmin = false, requireUser = false }) => {
  const { isAdmin, isUser } = useRoleGuard();

  if (requireAdmin && !isAdmin()) {
    return <Navigate to="/admin/login" replace />;
  }

  if (requireUser && !isUser()) {
    return <Navigate to="/login" replace />;
  }

  if (!requireAdmin && !requireUser && !isAdmin() && !isUser()) {
    return <Navigate to="/login" replace />;
  }

  return children;
};