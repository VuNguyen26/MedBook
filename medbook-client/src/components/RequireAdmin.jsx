import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

export default function RequireAdmin() {
  const { user } = useAuth();

  if (!user) return <Navigate to="/login" replace />;
  if (user.role === "DOCTOR") return <Navigate to="/doctor/schedule" replace />;
  if (user.role === "PATIENT") return <Navigate to="/" replace />;

  // Hợp lệ (admin)
  return <Outlet />;
}
