import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { 
  Mail, 
  LogIn, 
  Stethoscope, 
  Shield, 
  ChevronRight,
  Home // Thêm icon Home
} from "lucide-react";
import { toast } from "react-toastify";

export default function ForgotPassword() {
  const [email, setEmail] = useState("");
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      toast.error("Vui lòng nhập địa chỉ email hợp lệ", {
        theme: "colored",
        autoClose: 4000,
      });
      setLoading(false);
      return;
    }

    try {
      await new Promise((resolve) => setTimeout(resolve, 1000));

      toast.success("Liên kết đặt lại mật khẩu đã được gửi đến email của bạn", {
        theme: "colored",
        autoClose: 3000,
      });

      setEmail("");

      setTimeout(() => {
        nav("/reset-password?token=demo123");
      }, 1500);
    } catch (err) {
      toast.error("Gửi thất bại. Vui lòng thử lại sau.", {
        theme: "colored",
        autoClose: 4000,
      });
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-cyan-50 flex items-center justify-center px-4 py-8 relative">
      <div className="w-full max-w-5xl relative">

        {/* NÚT QUAY VỀ TRANG CHỦ - GÓC TRÊN BÊN PHẢI */}
        <div className="absolute top-4 right-4 z-50">
          <Link
            to="/"
            className="group flex items-center gap-2 px-4 py-2 bg-white/80 backdrop-blur-sm text-gray-700 font-medium rounded-full shadow-md hover:shadow-lg hover:bg-white transition-all duration-300 transform hover:scale-105"
          >
            <Home className="h-4 w-4 group-hover:text-blue-600 transition-colors" />
            <span className="hidden sm:inline text-sm">Trang chủ</span>
          </Link>
        </div>

        {/* Nội dung chính */}
        <div className="bg-white rounded-3xl shadow-2xl overflow-hidden grid lg:grid-cols-2">
          {/* Bên trái: Hero */}
          <div className="bg-gradient-to-br from-blue-600 to-cyan-600 p-10 text-white flex flex-col justify-between">
            <div>
              <div className="flex items-center gap-3 mb-10">
                <div className="p-3 bg-white/20 backdrop-blur-sm rounded-2xl">
                  <Shield className="h-7 w-7" />
                </div>
                <span className="text-2xl font-bold tracking-tight">MediBook</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight mb-4">
                Quên mật khẩu?
                <br />
                <span className="text-yellow-300">Chúng tôi giúp bạn</span>
              </h1>

              <p className="text-white/90 text-lg mb-8">
                Chỉ cần nhập email đã đăng ký, chúng tôi sẽ gửi ngay liên kết đặt lại mật khẩu an toàn.
              </p>

              <div className="space-y-3">
                {[
                  { icon: Shield, text: "Mã hóa dữ liệu end-to-end" },
                  { icon: "Lock", text: "Liên kết hết hạn sau 15 phút" },
                  { icon: "Check", text: "Không lưu mật khẩu" },
                ].map((item, i) => (
                  <div key={i} className="flex items-center gap-3">
                    <div className="p-2 bg-white/20 rounded-xl">
                      {typeof item.icon === "string" ? (
                        <span className="text-lg">Lock</span>
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
              © 2025 MediBook. Bảo mật theo tiêu chuẩn HIPAA.
            </p>
          </div>

          {/* Bên phải: Form */}
          <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Đặt lại mật khẩu
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Nhập email để nhận liên kết khôi phục
                </p>
              </div>

              <form onSubmit={submit} className="space-y-6">
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
                      Đang gửi...
                    </>
                  ) : (
                    <>
                      <Mail className="h-5 w-5" />
                      Gửi liên kết
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Nhớ mật khẩu rồi?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors inline-flex items-center"
                >
                  Đăng nhập ngay
                  <ChevronRight className="ml-1 h-4 w-4" />
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}