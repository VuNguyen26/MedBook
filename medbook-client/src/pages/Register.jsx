import { useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import userApi from "../api/userApi";
import { 
  User, 
  Mail, 
  Phone, 
  Lock, 
  LogIn, 
  Stethoscope, 
  Calendar, 
  ChevronRight,
  Home // Thêm icon Home
} from "lucide-react";
import { toast } from "react-toastify";

export default function Register() {
  const [name, setName] = useState("");
  const [email, setEmail] = useState("");
  const [phone, setPhone] = useState("");
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [agree, setAgree] = useState(false);
  const [loading, setLoading] = useState(false);
  const nav = useNavigate();

  const submit = async (e) => {
    e.preventDefault();
    if (loading) return;
    setLoading(true);

    if (!name || !email || !phone || !password || !confirm) {
      toast.error("Vui lòng nhập đầy đủ thông tin");
      setLoading(false);
      return;
    }

    if (!/^[0-9]{10}$/.test(phone)) {
      toast.error("Số điện thoại phải có đúng 10 chữ số");
      setLoading(false);
      return;
    }

    if (password.trim().length < 6) {
      toast.error("Mật khẩu phải có ít nhất 6 ký tự");
      setLoading(false);
      return;
    }

    if (password !== confirm) {
      toast.error("Mật khẩu xác nhận không khớp");
      setLoading(false);
      return;
    }

    if (!agree) {
      toast.error("Bạn cần đồng ý với Điều khoản & Chính sách bảo mật");
      setLoading(false);
      return;
    }

    try {
      const res = await userApi.register({
        name: name.trim(),
        email: email.trim(),
        phone: phone.trim(),
        password: password.trim(),
        role: "PATIENT",
      });

      if (res.status === 200 || res.status === 201) {
        toast.success("Đăng ký thành công! Vui lòng đăng nhập.");
        setTimeout(() => nav("/login"), 1500);
      }
    } catch (err) {
      console.error("Register error:", err);
      const message =
        err.response?.data?.message ||
        err.response?.data?.error ||
        err.message ||
        "Đăng ký thất bại, vui lòng thử lại.";
      toast.error("Lỗi: " + message);
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
                  <Stethoscope className="h-7 w-7" />
                </div>
                <span className="text-2xl font-bold tracking-tight">MediBook</span>
              </div>

              <h1 className="text-4xl font-extrabold leading-tight mb-4">
                Bắt đầu hành trình
                <br />
                <span className="text-yellow-300">Chăm sóc sức khỏe</span>
              </h1>

              <p className="text-white/90 text-lg mb-8">
                Tạo tài khoản miễn phí để:
              </p>

              <div className="space-y-3">
                {[
                  { icon: Calendar, text: "Đặt lịch khám chỉ trong 30 giây" },
                  { icon: Stethoscope, text: "Kết nối với 500+ bác sĩ uy tín" },
                  { icon: "Check", text: "Nhận nhắc lịch & kết quả tự động" },
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
              © 2025 MediBook. Bảo mật theo tiêu chuẩn HIPAA.
            </p>
          </div>

          {/* Bên phải: Form đăng ký */}
          <div className="p-8 lg:p-12 flex flex-col justify-center bg-white">
            <div className="max-w-md mx-auto w-full">
              <div className="text-center mb-8">
                <h2 className="text-3xl font-bold text-gray-900">
                  Tạo tài khoản
                </h2>
                <p className="mt-2 text-sm text-gray-600">
                  Điền thông tin để bắt đầu
                </p>
              </div>

              <form onSubmit={submit} className="space-y-5">
                {/* Họ và tên */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Họ và tên
                  </label>
                  <div className="relative">
                    <User className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="text"
                      required
                      value={name}
                      onChange={(e) => setName(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="Nguyễn Văn A"
                      disabled={loading}
                    />
                  </div>
                </div>

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
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="you@example.com"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Số điện thoại */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Số điện thoại
                  </label>
                  <div className="relative">
                    <Phone className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value.replace(/\D/g, "").slice(0, 10))}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="0912345678"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Chỉ nhập 10 chữ số</p>
                </div>

                {/* Mật khẩu */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={password}
                      onChange={(e) => setPassword(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>
                  <p className="text-xs text-gray-500 mt-1">Tối thiểu 6 ký tự</p>
                </div>

                {/* Xác nhận mật khẩu */}
                <div>
                  <label className="block text-sm font-semibold text-gray-700 mb-2">
                    Xác nhận mật khẩu
                  </label>
                  <div className="relative">
                    <Lock className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-gray-400" />
                    <input
                      type="password"
                      required
                      value={confirm}
                      onChange={(e) => setConfirm(e.target.value)}
                      className="w-full pl-11 pr-4 py-3.5 bg-gray-50 border border-gray-200 rounded-xl text-gray-900 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200"
                      placeholder="••••••••"
                      disabled={loading}
                    />
                  </div>
                </div>

                {/* Checkbox */}
                <div className="flex items-start gap-3">
                  <input
                    type="checkbox"
                    checked={agree}
                    onChange={(e) => setAgree(e.target.checked)}
                    className="w-5 h-5 text-blue-600 border-2 border-gray-300 rounded-md focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 cursor-pointer transition"
                    disabled={loading}
                  />
                  <label className="text-sm text-gray-600 leading-tight cursor-pointer">
                    Tôi đồng ý với{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Điều khoản sử dụng
                    </a>{" "}
                    và{" "}
                    <a href="#" className="text-blue-600 hover:text-blue-700 font-medium underline">
                      Chính sách bảo mật
                    </a>
                  </label>
                </div>

                {/* Nút tạo tài khoản */}
                <button
                  type="submit"
                  disabled={!agree || loading}
                  className={`w-full py-3.5 rounded-xl font-semibold text-white transition-all duration-300 flex items-center justify-center gap-2 shadow-lg ${
                    !agree || loading
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
                      Tạo tài khoản
                    </>
                  )}
                </button>
              </form>

              <p className="mt-8 text-center text-sm text-gray-600">
                Đã có tài khoản?{" "}
                <Link
                  to="/login"
                  className="font-semibold text-blue-600 hover:text-blue-700 transition-colors"
                >
                  Đăng nhập ngay
                </Link>
              </p>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}