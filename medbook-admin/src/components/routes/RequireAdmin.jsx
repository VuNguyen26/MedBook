import { Navigate, Outlet } from "react-router-dom";
import { useAuth } from "../../store/AuthContext";

export default function RequireAdmin() {
  const { user } = useAuth();

  // Chưa đăng nhập → về login
  if (!user) {
    return <Navigate to="/login" replace />;
  }

  // Không phải admin → chặn truy cập
  if (user.role !== "ADMIN") {
    return <Navigate to="/doctor/schedule" replace />;
  }

  // Hợp lệ render tiếp route con
  return <Outlet />;
}
