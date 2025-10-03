import { useState } from "react"
import { useNavigate, Link } from "react-router-dom"
import { auth } from "../store/auth"
import { User, Mail, Phone, Lock } from "lucide-react"
import { toast } from "react-toastify"

export default function Register() {
  const [name, setName] = useState("")
  const [email, setEmail] = useState("")
  const [phone, setPhone] = useState("")
  const [password, setPassword] = useState("")
  const [confirm, setConfirm] = useState("")
  const [agree, setAgree] = useState(false)
  const nav = useNavigate()

  const submit = (e) => {
    e.preventDefault()

    // Kiểm tra rỗng
    if (!name || !email || !phone || !password || !confirm) {
      toast.error("❌ Vui lòng nhập đầy đủ thông tin")
      return
    }

    // Kiểm tra số điện thoại (10 số, chỉ chứa số)
    const phoneRegex = /^[0-9]{10}$/
    if (!phoneRegex.test(phone)) {
      toast.error("❌ Số điện thoại phải có đúng 10 chữ số")
      return
    }

    // Kiểm tra độ dài mật khẩu (>= 6 ký tự)
    if (password.trim().length < 6) {
      toast.error("❌ Mật khẩu phải có ít nhất 6 ký tự")
      return
    }

    // Kiểm tra xác nhận mật khẩu
    if (password !== confirm) {
      toast.error("❌ Mật khẩu xác nhận không khớp")
      return
    }

    // Kiểm tra đồng ý điều khoản
    if (!agree) {
      toast.error("❌ Bạn cần đồng ý với Điều khoản & Chính sách bảo mật")
      return
    }

    // Thực hiện đăng ký
    try {
      auth.register({ name, email, phone, password })
      toast.success("🎉 Đăng ký thành công! Vui lòng đăng nhập.")
      nav("/login")
    } catch (err) {
      toast.error(err.message)
    }
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
                Mật khẩu phải có ít nhất 6 ký tự
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

            {/* Button */}
            <button
              type="submit"
              disabled={!agree}
              className={`w-full py-2.5 rounded-lg font-medium transition
                ${agree
                  ? "bg-teal-700 text-white hover:bg-teal-800"
                  : "bg-gray-300 text-gray-500 cursor-not-allowed"
                }`}
            >
              Tạo tài khoản
            </button>
          </form>

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
