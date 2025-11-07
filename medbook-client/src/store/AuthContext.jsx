import { createContext, useContext, useState, useEffect } from "react";
import userApi from "../api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (token && role && email) {
      setUser({ token, role, email });
    } else if (token) {
      // fallback: nếu chỉ có token thì gọi profile API
      userApi
        .getProfile()
        .then((res) => setUser(res.data))
        .catch(() => {
          localStorage.removeItem("token");
          setUser(null);
        });
    }
  }, []);

  const login = (token, userData) => {
    // Lưu vào localStorage
    localStorage.setItem("token", token);
    if (userData.role) localStorage.setItem("role", userData.role);
    if (userData.email) localStorage.setItem("email", userData.email);

    // Cập nhật state
    setUser({ token, ...userData });
  };

  const logout = () => {
    // Chỉ xóa dữ liệu, KHÔNG redirect
    localStorage.removeItem("token");
    localStorage.removeItem("role");
    localStorage.removeItem("email");
    setUser(null);
  };

  return (
    <AuthContext.Provider value={{ user, setUser, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
