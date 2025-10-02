import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../store/auth.js"
import { api } from "../store/api.js"
import { Mail, Lock } from "lucide-react"

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const [error, setError] = useState("")

  const nav = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    const u = await login(email, password, api)
    if (!u) {
      setError("❌ Email hoặc mật khẩu không chính xác")
      return
    }
    const destByRole = {
      patient: "/patient",
      doctor: "/doctor",
      staff: "/staff",
      admin: "/admin",
    }
    nav(destByRole[u.role] || from, { replace: true })
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
              Đặt lịch khám bệnh <br /> dễ dàng, nhanh chóng
            </h1>
            <p className="text-white/90">
              Kết nối với các bác sĩ và cơ sở y tế uy tín. Quản lý lịch hẹn khám của bạn một cách thuận tiện.
            </p>
          </div>
          <p className="text-xs text-white/70">
            © 2025 MediBook. Nền tảng đặt lịch khám bệnh trực tuyến.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            Đăng nhập
          </h2>
          <p className="text-sm text-center text-slate-600 mb-6">
            Nhập thông tin để truy cập tài khoản của bạn
          </p>

          <form onSubmit={submit} className="space-y-5">
            {/* Email */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Email
              </label>
              <div className="relative">
                <Mail className="absolute left-3 top-2.5 text-slate-900" size={18} />
                <input
                  type="email"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:outline-none"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="ten@email.com"
                  required
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <div className="flex items-center justify-between mb-1">
                <label className="block text-sm font-medium text-slate-700">
                  Mật khẩu
                </label>
                <a href="#" className="text-sm text-teal-700 hover:underline">
                  Quên mật khẩu?
                </a>
              </div>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-900" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg bg-white text-slate-900 placeholder-slate-400 focus:ring-2 focus:ring-teal-600 focus:border-teal-600 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                  required
                />
              </div>
            </div>

            {/* Error */}
            {error && (
              <div className="text-sm text-red-600 bg-red-50 border border-red-200 p-2 rounded-lg">
                {error}
              </div>
            )}

            {/* Submit button */}
            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition"
            >
              Đăng nhập
            </button>
          </form>

          {/* Social login */}
          <div className="my-6 flex items-center">
            <div className="flex-1 border-t border-slate-200"></div>
            <span className="px-3 text-sm text-slate-500">HOẶC TIẾP TỤC VỚI</span>
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

          {/* Register */}
          <p className="mt-6 text-sm text-center text-slate-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-teal-700 hover:underline font-semibold">
              Đăng ký ngay
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
