import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../../store/auth"

export default function RequireDoctor() {
  const user = auth.getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  if (user.role !== "doctor") return <Navigate to="/admin/dashboard" replace />
  return <Outlet />
}
