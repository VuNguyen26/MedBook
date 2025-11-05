import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

export default function RequireDoctor() {
  const { user } = useAuth();

  // Chưa đăng nhập → về login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Không phải doctor chặn truy cập
  if (user.role !== "DOCTOR") {
    return <Navigate to="/admin/dashboard" replace />;
  }

  // Hợp lệ render tiếp route con
  return <Outlet />;
}
