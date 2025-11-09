import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "@/store/AuthContext";
export default function RequirePatient({ children }) {
  const { user } = useAuth();
  const location = useLocation();
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }
  if (user.role === "ADMIN") return <Navigate to="/admin/dashboard" replace />;
  if (user.role === "DOCTOR") return <Navigate to="/doctor/schedule" replace />;
  if (user.role !== "PATIENT") return <Navigate to="/login" replace />;
  return children;
}
