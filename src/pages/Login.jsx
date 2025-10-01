import { useState } from "react"
import { useNavigate, useLocation, Link } from "react-router-dom"
import { useAuth } from "../store/auth.js"
import { api } from "../store/api.js"
import { Phone, Lock } from "lucide-react" // npm install lucide-react

export default function Login() {
  const [phone, setPhone] = useState("0900000001")
  const [password, setPassword] = useState("123456")
  const [error, setError] = useState("")
  const nav = useNavigate()
  const location = useLocation()
  const from = location.state?.from?.pathname || "/"
  const { login } = useAuth()

  const submit = async (e) => {
    e.preventDefault()
    const u = await login(phone, password, api)
    if (!u) {
      setError("❌ Sai số điện thoại hoặc mật khẩu")
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
    <div className="min-h-screen bg-gradient-to-r from-blue-50 to-indigo-100 flex items-center justify-center px-4">
      <div className="max-w-5xl w-full bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
        {/* Left image */}
        <div className="hidden md:flex items-center justify-center bg-blue-600 p-8">
          <img
            src="https://cdn-icons-png.flaticon.com/512/3209/3209265.png"
            alt="Login illustration"
            className="w-64"
          />
        </div>

        {/* Right form */}
        <div className="p-8 md:p-12 flex flex-col justify-center">
          <h2 className="text-3xl font-bold text-slate-900 mb-6 text-center">
            Đăng nhập <span className="text-blue-600">MedBook</span>
          </h2>

          <form onSubmit={submit} className="space-y-5">
            {/* Phone */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Số điện thoại
              </label>
              <div className="relative">
                <Phone className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="090..."
                />
              </div>
            </div>

            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mật khẩu
              </label>
              <div className="relative">
                <Lock className="absolute left-3 top-2.5 text-slate-400" size={18} />
                <input
                  type="password"
                  className="w-full pl-10 pr-4 py-2 border border-slate-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:outline-none"
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  placeholder="******"
                />
              </div>
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
              className="w-full py-2.5 rounded-lg bg-gradient-to-r from-blue-600 to-indigo-600 text-white font-medium hover:from-blue-700 hover:to-indigo-700 transition"
            >
              Đăng nhập
            </button>
          </form>

          {/* Demo info */}
          <div className="mt-6 text-xs text-slate-500 text-center">
            Tài khoản demo: 0900000001/2/3/4 — mật khẩu: 123456
          </div>

          {/* Extra */}
          <div className="mt-4 text-sm text-center text-slate-600">
            Chưa có tài khoản?{" "}
            <Link to="/register" className="text-blue-600 hover:underline">
              Đăng ký ngay
            </Link>
          </div>
        </div>
      </div>
    </div>
  )
}
