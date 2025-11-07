import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { Mail, Lock, LogIn } from "lucide-react";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import api from "../api/axios";
import { useAuth } from "../store/AuthContext";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const { login } = useAuth();

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await api.post("/api/auth/login", { email, password });
      const { token, role, message } = res.data;

      if (!token) {
        toast.error("Không nhận được token từ máy chủ!", {
          theme: "colored",
          autoClose: 4000,
        });
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      login(token, { email, role });

      const successTranslations = {
        "Login successful": "Đăng nhập thành công!",
        "User created successfully": "Tạo tài khoản thành công!",
      };
      const translatedMsg =
        successTranslations[message] || message || "Đăng nhập thành công!";

      if (role === "ADMIN") {
        toast.success("Đăng nhập tài khoản Quản trị viên thành công!", {
          theme: "colored",
          autoClose: 2500,
        });
        navigate("/admin/dashboard", { replace: true });
      } else if (role === "DOCTOR") {
        toast.success(translatedMsg, {
          theme: "colored",
          autoClose: 2500,
        });
        navigate("/doctor/schedule", { replace: true });
      } else if (role === "PATIENT") {
        toast.warning("Bạn không có quyền truy cập hệ thống này!", {
          theme: "colored",
          autoClose: 3500,
        });
        navigate("/", { replace: true });
      } else {
        toast.warning(
          "Không xác định được quyền người dùng, vui lòng thử lại!",
          { theme: "colored" }
        );
      }
    } catch (err) {
      console.error("Login error:", err);

      let msg =
        err.response?.data?.message ||
        err.response?.data?.error ||
        "Email hoặc mật khẩu không chính xác!";

      const translations = {
        "Invalid email or password": "Email hoặc mật khẩu không chính xác!",
        "User not found": "Không tìm thấy người dùng!",
        "Password incorrect": "Mật khẩu không chính xác!",
        "Account disabled": "Tài khoản của bạn đã bị vô hiệu hóa!",
        "Access denied": "Bạn không có quyền truy cập!",
      };
      msg = translations[msg] || msg;

      toast.error(msg, {
        theme: "colored",
        autoClose: 4000,
        pauseOnHover: true,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-blue-50 via-white to-cyan-50 dark:from-gray-900 dark:via-gray-800 dark:to-gray-900 px-4">
      <div className="w-full max-w-md">
        {/* Card Container */}
        <div className="bg-white dark:bg-gray-800 rounded-2xl shadow-xl p-8 border border-gray-100 dark:border-gray-700">
          {/* Logo & Title */}
          <div className="text-center mb-8">
            <div className="flex justify-center mb-4">
              <div className="p-3 bg-blue-100 dark:bg-blue-900 rounded-full">
                <LogIn className="h-8 w-8 text-blue-600 dark:text-blue-400" />
              </div>
            </div>
            <h1 className="text-3xl font-bold text-gray-900 dark:text-white">
              Doctor Panel
            </h1>
            <p className="mt-2 text-sm text-gray-600 dark:text-gray-400">
              Đăng nhập để quản lý lịch khám và bệnh nhân
            </p>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Email Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                  placeholder="admin@medbook.com"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Password Field */}
            <div>
              <label className="block text-sm font-semibold text-gray-700 dark:text-gray-300 mb-2">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                <input
                  type="password"
                  required
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  className="w-full pl-11 pr-4 py-3 bg-gray-50 dark:bg-gray-700 border border-gray-200 dark:border-gray-600 rounded-xl text-gray-900 dark:text-white placeholder-gray-400 dark:placeholder-gray-500 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                  placeholder="••••••••"
                  disabled={loading}
                />
              </div>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              disabled={loading}
              className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 ${
                loading
                  ? "bg-gray-400 cursor-not-allowed"
                  : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 shadow-lg hover:shadow-xl transform hover:-translate-y-0.5"
              }`}
            >
              {loading ? (
                <>
                  <div className="animate-spin h-5 w-5 border-2 border-white border-t-transparent rounded-full"></div>
                  Đang xử lý...
                </>
              ) : (
                <>
                  <LogIn className="h-5 w-5" />
                  Đăng nhập
                </>
              )}
            </button>
          </form>

          {/* Footer Links */}
          <div className="mt-6 text-center">
            <a
              href="#"
              className="text-sm text-blue-600 dark:text-blue-400 hover:text-blue-800 dark:hover:text-blue-300 font-medium transition-colors"
            >
              Quên mật khẩu?
            </a>
          </div>
        </div>

        {/* Footer Note */}
        <p className="mt-6 text-center text-xs text-gray-500 dark:text-gray-400">
          © 2025 Hệ thống Đặt lịch khám bệnh. Bảo mật thông tin y tế.
        </p>
      </div>
    </div>
  );
}