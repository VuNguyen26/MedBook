import { createContext, useContext, useState, useEffect } from "react";
import userApi from "../api/userApi";

const AuthContext = createContext();

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);

  // Khi load trang, đọc dữ liệu user từ localStorage
  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    const email = localStorage.getItem("email");

    if (token && role && email) {
      setUser({ token, role, email });
    } else if (token) {
      userApi
        .getProfile()
        .then((res) => {
          const userData = res.data;
          if (userData.role) localStorage.setItem("role", userData.role);
          if (userData.email) localStorage.setItem("email", userData.email);
          setUser({ token, ...userData });
        })
        .catch(() => {
          localStorage.clear();
          setUser(null);
        });
    } else {
      setUser(null);
    }
  }, []);

  // Login: lưu thông tin và token vào localStorage
  const login = (token, userData) => {
    if (!token) return;
    localStorage.setItem("token", token);
    if (userData?.role) localStorage.setItem("role", userData.role);
    if (userData?.email) localStorage.setItem("email", userData.email);
    setUser({ token, ...userData });
  };

  // Logout: chỉ xóa dữ liệu, KHÔNG điều hướng tại đây
  const logout = () => {
    console.log("logout triggered");
    try {
      localStorage.removeItem("token");
      localStorage.removeItem("role");
      localStorage.removeItem("email");
      sessionStorage.clear();
      setUser(null);
    } catch (error) {
      console.error("Logout failed:", error);
    }
  };

  const isAuthenticated = !!user?.token;
  const hasRole = (roles) => roles?.includes(user?.role);

  return (
    <AuthContext.Provider
      value={{
        user,
        setUser,
        login,
        logout,
        isAuthenticated,
        hasRole,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => useContext(AuthContext);
