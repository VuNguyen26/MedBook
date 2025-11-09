// src/components/RequireRole.jsx
import { Navigate, Outlet, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function RequireRole({ allowedRoles }) {
  const { user } = useAuth();
  const location = useLocation();
  const token = localStorage.getItem("token");
  if (!user || !token) {
    console.warn("RequireRole: No user or token, redirecting to /login");
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  if (allowedRoles && !allowedRoles.includes(user.role)) {
    switch (user.role) {
      case "ADMIN":
        return <Navigate to="/admin/dashboard" replace />;
      case "DOCTOR":
        return <Navigate to="/doctor/schedule" replace />;
      case "PATIENT":
      default:
        return <Navigate to="/" replace />;
    }
  }
  return <Outlet />;
}
