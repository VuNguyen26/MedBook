import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { api } from "../store/api.js"
import { User, Mail, Phone, Lock } from "lucide-react"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [agree, setAgree] = useState(false)
  const [error, setError] = useState("")
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()
    if (!name || !email || !phone || !password || !confirm) {
      setError("❌ Vui lòng nhập đầy đủ thông tin")
      return
    }
    if (password.length < 8) {
      setError("❌ Mật khẩu phải có ít nhất 8 ký tự")
      return
    }
    if (password !== confirm) {
      setError("❌ Mật khẩu xác nhận không khớp")
      return
    }
    if (!agree) {
      setError("❌ Bạn cần đồng ý với Điều khoản & Chính sách bảo mật")
      return
    }

    // Demo thêm user
    api.addUser({ name, email, phone, password, role: "patient" })
    nav("/login")
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        {/* Left side */}
        <div className="bg-teal-700 text-white flex flex-col justify-between p-10">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                📅
              </div>
              <span className="text-2xl font-semibold">MediBook</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Bắt đầu chăm sóc sức khỏe của bạn ngay hôm nay
            </h1>
            <p className="text-white/90">
              Tạo tài khoản để đặt lịch khám với các bác sĩ chuyên khoa,
              theo dõi lịch sử khám bệnh và nhận tư vấn sức khỏe.
            </p>
          </div>
          <p className="text-xs text-white/70">
            © 2025 MediBook. Nền tảng đặt lịch khám bệnh trực tuyến.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="p-10 flex flex-col justify-center bg-white">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            Tạo tài khoản
          </h2>
          <p className="text-sm text-center text-slate-600 mb-6">
            Điền thông tin để bắt đầu đặt lịch khám bệnh
          </p>

          <form onSubmit={submit} className="space-y-5">
            {/* Name */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Họ và tên
              </label>
              <div className="relative">
                <User className="absolute left-3 top-2.5 text-slate-900" size={18} />
                <input
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 
                  focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:outline-none"
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="Nguyễn Văn A"
                  required
                />
              </div>
            </div>

            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-slate-900" size={18} />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 
                  focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ten@email.com"
                  required
                />
              </div>
            </div>

            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-slate-900" size={18} />
                <input
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 
                  focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="0912345678"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-900" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 
                  focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  required
                />
              </div>
              <p className="text-xs text-slate-500 mt-1">
                Mật khẩu phải có ít nhất 8 ký tự
              </p>
            </div>

            {/* Confirm Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Xác nhận mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-900" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 
                  focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:outline-none"
                  value={confirm}
                  onChange={(e) => setConfirm(e.target.value)}
                  placeholder="******"
                  required
                />
              </div>
            </div>

            {/* Checkbox */}
            <div className="flex items-start gap-2">
                <input
                  type="checkbox"
                  checked={agree}
                  onChange={(e) => setAgree(e.target.checked)}
                  className="mt-1 accent-teal-700"
                />
                <span className="text-sm text-slate-600">
                  Tôi đồng ý với{" "}
                  <a href="#" className="text-teal-700 hover:underline">
                    Điều khoản sử dụng
                  </a>{" "}
                  và{" "}
                  <a href="#" className="text-teal-700 hover:underline">
                    Chính sách bảo mật
                  </a>
                </span>
              </div>

              {/* Error */}
              {error && (
                <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
                  {error}
                </div>
              )}

              {/* Button */}
              <button
                type="submit"
                disabled={!agree}  // chỉ bật khi agree = true
                className={`w-full py-2.5 rounded-lg font-medium transition
                  ${agree
                    ? "bg-teal-700 text-white hover:bg-teal-800"
                    : "bg-gray-300 text-gray-500 cursor-not-allowed"
                  }`}
                >
                Tạo tài khoản
              </button>
          </form>

          {/* Social login */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-3 text-sm text-slate-500">HOẶC ĐĂNG KÝ VỚI</span>
            <div className="flex-1 border-t border-slate-200"></div>
          </div>

          <div className="flex gap-4">
            <button className="flex-1 border border-slate-300 py-2 rounded-lg flex items-center justify-center gap-2 bg-white hover:bg-slate-50 transition">
              <img src="https://www.svgrepo.com/show/475656/google-color.svg" alt="Google" className="w-5 h-5" />
              <span className="text-slate-700 font-medium">Google</span>
            </button>
            <button className="flex-1 border border-slate-300 py-2 rounded-lg flex items-center justify-center gap-2 bg-white hover:bg-slate-50 transition">
              <img src="https://www.svgrepo.com/show/448224/facebook.svg" alt="Facebook" className="w-5 h-5" />
              <span className="text-slate-700 font-medium">Facebook</span>
            </button>
          </div>

          {/* Login link */}
          <p className="mt-6 text-sm text-center text-slate-600">
            Đã có tài khoản?{" "}
            <Link to="/login" className="text-teal-700 hover:underline font-semibold">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
