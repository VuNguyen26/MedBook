import { useState } from "react";
import { useNavigate, useLocation, Link } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import userApi from "../api/userApi";
import {
  Mail,
  Lock,
  LogIn,
  Calendar,
  Stethoscope,
  Home, // Thêm icon Home
} from "lucide-react";
import { toast } from "react-toastify";

export default function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const navigate = useNavigate();
  const location = useLocation();
  const { login: setAuthUser } = useAuth();

  const from = location.state?.from?.pathname || "/";

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    try {
      const res = await userApi.login({ email, password });
      const { token, role, message } = res.data;

      if (!token) {
        toast.error("Không nhận được mã xác thực từ máy chủ!", {
          theme: "colored",
          autoClose: 4000,
        });
        return;
      }

      localStorage.setItem("token", token);
      localStorage.setItem("role", role);
      localStorage.setItem("email", email);

      setAuthUser(token, { role, email });

      const successTranslations = {
        "Login successful": "Đăng nhập thành công!",
        "User created successfully": "Tạo tài khoản thành công!",
      };

      const translatedMsg =
        successTranslations[message] || message || "Đăng nhập thành công!";

      navigate(from, { replace: true });

      setTimeout(() => {
        toast.success("Đăng nhập thành công!", {
          theme: "colored",
          autoClose: 2500,
          pauseOnHover: false,
        });
      }, 300);
    } catch (err) {
      console.error("Lỗi đăng nhập:", err);

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
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-5xl relative"> {/* relative để chứa nút tuyệt đối */}

        {/* ===== NÚT QUAY VỀ TRANG CHỦ - GÓC TRÊN BÊN PHẢI ===== */}
        <div className="absolute top-4 right-4 z-50">
          <Link
            to="/"
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 font-medium rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            <Home className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
            <span className="hidden sm:inline text-sm">Trang chủ</span>
          </Link>
        </div>

        {/* ===== Nội dung chính ===== */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
          {/* Bên trái: Hero */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-10 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Stethoscope className="h-7 w-7" />
                </div>
                <span className="text-2xl font-bold tracking-tight">MedBook</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight mb-4">
                Đặt lịch khám
                <br />
                <span className="text-yellow-300">chỉ trong 30 giây</span>
              </h1>

              <p className="text-white/90 text-lg mb-8">
                Hàng ngàn bác sĩ • Hỗ trợ 24/7 • Nhắc lịch tự động
              </p>

              <div className="space-y-3">
                {[
                  { icon: Calendar, text: "Chọn khung giờ phù hợp" },
                  { icon: Stethoscope, text: "Bác sĩ chuyên khoa hàng đầu" },
                  { icon: "Check", text: "Nhận kết quả qua ứng dụng" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      {typeof item.icon === "string" ? (
                        <span className="text-lg">Check</span>
                      ) : (
                        <item.icon className="h-5 w-5" />
                      )}
                    </div>
                    <span className="font-medium">{item.text}</span>
                  </div>
                ))}
              </div>
            </div>

            <p className="text-xs text-white/70 mt-12">
              © 2025 MedBook. Bảo mật theo tiêu chuẩn HIPAA.
            </p>
          </div>

          {/* Bên phải: Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Chào mừng trở lại
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Đăng nhập để tiếp tục quản lý sức khỏe
                </p>
              </div>

              <form onSubmit={handleSubmit} className="space-y-6">
                {/* Email */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Email
                  </label>
                  <div className="relative">
                    <Mail className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                      placeholder="you@example.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Mật khẩu */}
                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="block text-sm font-semibold text-gray-700">
                      Mật khẩu
                    </label>
                    <Link
                      to="/forgot-password"
                      className="text-sm font-medium text-blue-600 hover:text-blue-700 transition-colors"
                    >
                      Quên mật khẩu?
                    </Link>
                  </div>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type={showPassword ? "text" : "password"}
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-11 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 disabled:opacity-60"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                    <button
                      type="button"
                      onClick={() => setShowPassword(!showPassword)}
                      className="absolute right-3 top-1/2 -translate-y-1/2 text-gray-500 hover:text-gray-700 transition-colors"
                    >
                      {showPassword ? (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13.875 18.825A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.685.065-1.353.19-2M4.22 4.22l15.56 15.56M9.88 9.88A3 3 0 0115 15M9.88 9.88L9 9m12.71 4.29A10.05 10.05 0 0112 19c-5.523 0-10-4.477-10-10 0-.685.065-1.353.19-2" />
                        </svg>
                      ) : (
                        <svg className="h-5 w-5" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M2.458 12C3.732 7.943 7.523 5 12 5c4.477 0 8.268 2.943 9.542 7-1.274 4.057-5.065 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                        </svg>
                      )}
                    </button>
                  </div>
                </div>

                {/* Nút đăng nhập */}
                <button
                  type="submit"
                  disabled={loading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    loading
                      ? "bg-gray-400 cursor-not-allowed"
                      : "bg-gradient-to-r from-blue-600 to-cyan-600 hover:from-blue-700 hover:to-cyan-700 hover:shadow-xl transform hover:-translate-y-0.5"
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

              <p className="mt-8 text-center text-sm text-gray-600">
                Chưa có tài khoản?{" "}
                <Link
                  to="/register"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Đăng ký miễn phí
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}