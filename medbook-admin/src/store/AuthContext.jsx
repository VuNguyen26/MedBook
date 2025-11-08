// src/store/AuthContext.jsx
import { createContext, useContext, useState, useEffect } from "react"
import { useNavigate } from "react-router-dom"
import { jwtDecode } from "jwt-decode"
import { toast } from "react-toastify"
import api from "../api/axios"

const AuthContext = createContext()

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(undefined) // undefined = đang kiểm tra token
  const navigate = useNavigate()

  // Kiểm tra token khi app load hoặc F5
  useEffect(() => {
    const token = localStorage.getItem("token")
    if (!token) {
      setUser(null)
      return
    }

    try {
      const decoded = jwtDecode(token)

      // Nếu token hết hạn
      if (decoded.exp * 1000 < Date.now()) {
        toast.warning("Phiên đăng nhập đã hết hạn!", { theme: "colored" })
        logout(true)
        return
      }

      //  Gọi API để lấy thông tin user
      api.get("/users/profile")
        .then(res => setUser(res.data))
        .catch(() => {
          toast.error("Không thể lấy thông tin người dùng!", { theme: "colored" })
          logout(true)
        })
    } catch (err) {
      console.error("Lỗi token:", err)
      logout(true)
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [])

  // Khi đăng nhập thành công
  const login = (token, userData) => {
    localStorage.setItem("token", token)
    setUser(userData)
  }

  // Khi đăng xuất
  const logout = (silent = false) => {
    localStorage.removeItem("token")
    setUser(null)

    if (!silent) {
      toast.info("Đăng xuất thành công khỏi hệ thống!", {
        theme: "colored",
        autoClose: 2000,
      })
    }

    // Điều hướng về trang login (React Router, không reload app)
    navigate("/login", { replace: true })
  }

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {user === undefined ? (
        <div className="flex items-center justify-center h-screen text-gray-500 bg-gray-50">
          Đang kiểm tra phiên đăng nhập...
        </div>
      ) : (
        children
      )}
    </AuthContext.Provider>
  )
}

export const useAuth = () => useContext(AuthContext)
