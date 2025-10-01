// src/components/RequireAuth.jsx
import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/auth.js";

export default function RequireAuth({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) {
    // Chưa đăng nhập → redirect về login
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (roles && !roles.includes(user.role)) {
    // Sai quyền → redirect về Home
    return <Navigate to="/" replace />;
  }

  // Đúng quyền → render children
  return children;
}
