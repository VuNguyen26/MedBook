import { Navigate, Outlet } from "react-router-dom"
import { auth } from "../store/auth"

export default function RequireAdmin() {
  const user = auth.getCurrentUser()
  if (!user) return <Navigate to="/login" replace />
  return <Outlet />
}
