import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../store/AuthContext";

export default function RequireAuth({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  // Nếu chưa đăng nhập → chuyển đến /login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  // Nếu route yêu cầu role mà user không thuộc role đó → chặn truy cập
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />;
  }

  // Nếu hợp lệ → render children
  return children;
}
