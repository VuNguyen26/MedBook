import { Navigate, useLocation } from "react-router-dom"
import { auth } from "../store/auth"

export default function RequireAuth({ children, roles }) {
  const location = useLocation()
  const user = auth.getCurrentUser()

  // Nếu chưa đăng nhập → chuyển sang trang login
  if (!user) {
    return <Navigate to="/login" state={{ from: location }} replace />
  }

  // Nếu có truyền roles và user không thuộc roles đó → chặn truy cập
  if (roles && !roles.includes(user.role)) {
    return <Navigate to="/" replace />
  }

  // Nếu hợp lệ → render component con
  return children
}
