import { Navigate } from "react-router-dom"
import { auth } from "../store/auth"

export default function RequireAdmin({ children }) {
  const user = auth.getCurrentUser()
  
  if (!user || user.role !== "admin") {
    return <Navigate to="/login" />
  }

  return children
}
