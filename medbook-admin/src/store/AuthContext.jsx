import { createContext, useContext, useState, useEffect } from "react"
import api from "../api/axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null)

  // Lấy thông tin user khi reload trang
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (token) {
      api.get("/users/profile")
        .then(res => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token")
          setUser(null)
        })
    }
  }, [])

  const login = (token, userData) => {
    localStorage.setItem("token", token)
    setUser(userData)
  }

  const logout = () => {
    localStorage.removeItem("token")
    setUser(null)
    window.location.href = "/login"
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
