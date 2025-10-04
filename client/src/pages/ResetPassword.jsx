import { useState } from "react"
import { useNavigate, Link, useSearchParams } from "react-router-dom"
import { Lock } from "lucide-react"
import { toast } from "react-toastify"

export default function ResetPassword() {
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [params] = useSearchParams()
  const nav = useNavigate()

  const token = params.get("token") // token giả lập

  const submit = (e) => {
    e.preventDefault()

    if (!token) {
      toast.error("❌ Liên kết đặt lại mật khẩu không hợp lệ hoặc đã hết hạn")
      return
    }

    if (password.length < 6) {
      toast.error("❌ Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    if (password !== confirm) {
      toast.error("❌ Xác nhận mật khẩu không khớp")
      return
    }

    toast.success("🔑 Mật khẩu của bạn đã được đặt lại thành công")
    setPassword("")
    setConfirm("")

    setTimeout(() => {
      nav("/login")
    }, 2000)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">

        {/* Left side */}
        <div className="bg-gradient-to-br from-blue-600 to-teal-600 text-white flex flex-col justify-between p-10">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                🔒
              </div>
              <span className="text-2xl font-semibold">MediBook</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Đặt lại mật khẩu
            </h1>
            <p className="text-white/90">
              Hãy nhập mật khẩu mới để hoàn tất quá trình khôi phục tài khoản.
            </p>
          </div>
          <p className="text-xs text-white/70">© 2025 MediBook</p>
        </div>

        {/* Right side - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            Mật khẩu mới
          </h2>
          <p className="text-sm text-center text-slate-600 mb-6">
            Nhập mật khẩu mới và xác nhận để hoàn tất
          </p>

          <form onSubmit={submit} className="space-y-5">
            {/* Password */}
            <div>
              <label className="block text-sm font-medium text-slate-700 mb-1">
                Mật khẩu mới
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

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition"
            >
              Xác nhận
            </button>
          </form>

          <p className="mt-6 text-sm text-center text-slate-600">
            Quay lại{" "}
            <Link to="/login" className="text-teal-700 hover:underline font-semibold">
              Đăng nhập
            </Link>
          </p>
        </div>
      </div>
    </div>
  )
}
