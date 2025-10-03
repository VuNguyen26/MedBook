import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { Mail } from "lucide-react"
import { toast } from "react-toastify"

export default function ForgotPassword() {
  const [email, setEmail] = useState("")
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
    if (!emailRegex.test(email)) {
      toast.error("❌ Vui lòng nhập địa chỉ email hợp lệ")
      return
    }

    toast.success("📧 Liên kết đặt lại mật khẩu đã được gửi đến email của bạn")
    setEmail("")

    // Sau 1.5s chuyển đến trang reset password (giả lập)
    setTimeout(() => {
      nav("/reset-password?token=demo123")
    }, 1500)
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-100 px-4">
      <div className="max-w-4xl w-full bg-white rounded-2xl shadow-xl grid md:grid-cols-2 overflow-hidden">
        
        {/* Left side */}
        <div className="bg-gradient-to-br from-teal-600 to-blue-600 text-white flex flex-col justify-between p-10">
          <div>
            <div className="flex items-center gap-2 mb-8">
              <div className="w-10 h-10 bg-white/20 rounded-lg flex items-center justify-center">
                🔑
              </div>
              <span className="text-2xl font-semibold">MediBook</span>
            </div>
            <h1 className="text-3xl font-bold leading-tight mb-4">
              Quên mật khẩu?
            </h1>
            <p className="text-white/90">
              Đừng lo lắng, hãy nhập địa chỉ email của bạn và chúng tôi sẽ gửi
              liên kết đặt lại mật khẩu ngay lập tức.
            </p>
          </div>
          <p className="text-xs text-white/70">
            © 2025 MediBook. Nền tảng đặt lịch khám bệnh trực tuyến.
          </p>
        </div>

        {/* Right side - Form */}
        <div className="p-10 flex flex-col justify-center">
          <h2 className="text-2xl font-bold text-center text-slate-900 mb-2">
            Đặt lại mật khẩu
          </h2>
          <p className="text-sm text-center text-slate-600 mb-6">
            Nhập email của bạn để nhận liên kết đặt lại mật khẩu
          </p>

          <form onSubmit={submit} className="space-y-5">
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
                  placeholder="you@example.com"
                  required
                />
              </div>
            </div>

            <button
              type="submit"
              className="w-full py-2.5 rounded-lg bg-teal-700 text-white font-medium hover:bg-teal-800 transition"
            >
              Gửi liên kết đặt lại mật khẩu
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
