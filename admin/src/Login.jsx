import { useState } from "react"
import { useNavigate } from "react-router-dom"
import { Mail, Lock } from "lucide-react"
import { auth } from "./store/auth"   // <-- import auth.js bạn đã sửa

export default function Login() {
  const [email, setEmail] = useState("")
  const [password, setPassword] = useState("")
  const navigate = useNavigate()

  const handleSubmit = (e) => {
    e.preventDefault()
    try {
      const user = auth.login(email, password) // gọi hàm login

      // Điều hướng theo role
      if (user.role === "admin") {
        navigate("/dashboard")
      } else if (user.role === "doctor") {
        navigate("/doctor/schedule")
      }
    } catch (err) {
      alert(err.message)
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-pink-400 via-purple-500 to-indigo-600 dark:from-pink-900 dark:via-purple-900 dark:to-indigo-900">
      <div className="bg-white dark:bg-gray-900 shadow-2xl rounded-3xl w-full max-w-md p-10 border-2 border-yellow-300">
        
        {/* Logo + tiêu đề */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-clip-text text-transparent bg-gradient-to-r from-yellow-400 to-pink-600">
            Admin Panel
          </h1>
          <p className="text-lg text-yellow-300 dark:text-yellow-200 mt-2">
            Đăng nhập để quản trị hệ thống
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-6">
          <div>
            <label className="block text-sm font-bold text-pink-600 dark:text-pink-400">
              Email
            </label>
            <div className="relative mt-2">
              <Mail className="absolute left-3 top-3 h-6 w-6 text-yellow-400" />
              <input
                type="email"
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-xl focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 text-purple-900 dark:text-white font-medium border-none placeholder-pink-300 dark:placeholder-pink-200"
                placeholder="admin@example.com"
              />
            </div>
          </div>

          <div>
            <label className="block text-sm font-bold text-pink-600 dark:text-pink-400">
              Mật khẩu
            </label>
            <div className="relative mt-2">
              <Lock className="absolute left-3 top-3 h-6 w-6 text-yellow-400" />
              <input
                type="password"
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full pl-12 pr-4 py-3 bg-gradient-to-r from-purple-100 to-pink-100 dark:from-purple-800 dark:to-pink-800 rounded-xl focus:ring-4 focus:ring-yellow-400 focus:border-yellow-400 text-purple-900 dark:text-white font-medium border-none placeholder-pink-300 dark:placeholder-pink-200"
                placeholder="••••••••"
              />
            </div>
          </div>

          <button
            type="submit"
            className="w-full py-3 rounded-xl bg-gradient-to-r from-yellow-400 to-pink-500 text-white font-bold text-lg hover:from-yellow-500 hover:to-pink-600 transition-all duration-300 transform hover:scale-105 shadow-lg"
          >
            Đăng nhập
          </button>
        </form>

        {/* Footer */}
        <div className="mt-6 text-center">
          <a
            href="#"
            className="text-sm font-semibold text-yellow-400 hover:text-yellow-300 dark:text-yellow-300 dark:hover:text-yellow-200 transition-colors"
          >
            Quên mật khẩu?
          </a>
        </div>
      </div>
    </div>
  )
}
