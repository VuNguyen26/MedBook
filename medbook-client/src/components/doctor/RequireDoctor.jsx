import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

export default function RequireDoctor() {
  const { user } = useAuth();

  if (!user) {
    return <Navigate to="/login" replace />;
  }

  if (user.role !== "DOCTOR") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  return <Outlet />;
}
