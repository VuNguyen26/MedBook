import { Link, NavLink } from "react-router-dom"
import { useAuth } from "../store/auth.js"
import { useState } from "react"
import { Menu, X } from "lucide-react"

export default function NavBar() {
  const { user, logout } = useAuth()
  const [open, setOpen] = useState(false)

  // class cho NavLink
  const linkClass = ({ isActive }) =>
    "relative inline-block px-3 py-2 font-medium transition " +
    (isActive
      ? "text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600"
      : "text-slate-700 hover:text-blue-600 " +
        "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 " +
        "after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full")

  // scrollTop + đóng menu mobile
  const handleNavigate = () => {
    window.scrollTo({ top: 0, behavior: "smooth" })
    setOpen(false)
  }

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo */}
        <Link to="/" onClick={handleNavigate} className="flex items-center gap-2">
          <img 
            src="/doctors/logo.png"
            alt="MedBook Logo"
            className="w-9 h-9 rounded-xl shadow object-cover"
          />
          <div className="font-bold text-slate-900 text-lg">MedBook</div>
        </Link>

        {/* Desktop nav */}
        <nav className="hidden md:flex items-center gap-6 text-sm">
          <NavLink to="/" className={linkClass} onClick={handleNavigate}>
            Trang chủ
          </NavLink>
          <NavLink to="/doctors" className={linkClass} onClick={handleNavigate}>
            Đội ngũ bác sĩ
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={handleNavigate}>
            Về chúng tôi
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={handleNavigate}>
            Liên hệ
          </NavLink>
        </nav>

        {/* Actions */}
        <div className="hidden md:flex items-center gap-3">
          {!user && (
            <Link
              to="/login"
              onClick={handleNavigate}
              className="px-5 py-2 border border-blue-600 text-blue-600 rounded-lg hover:bg-blue-600 hover:text-white font-medium transition"
            >
              Đăng nhập
            </Link>
          )}
          {user && (
            <div className="flex items-center gap-3">
              <span className="text-sm text-slate-700">
                Xin chào, <b>{user.name}</b>{" "}
                <span className="ml-1 text-xs bg-blue-100 text-blue-700 px-2 py-0.5 rounded">
                  {user.role}
                </span>
              </span>
              <button
                className="px-4 py-2 border border-slate-300 rounded-lg hover:bg-slate-100 transition"
                onClick={() => {
                  logout()
                  handleNavigate()
                }}
              >
                Đăng xuất
              </button>
            </div>
          )}
        </div>

        {/* Mobile toggle */}
        <button
          className="md:hidden p-2 text-slate-700 hover:text-blue-600"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile menu */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-2">
          <NavLink to="/" className={linkClass} onClick={handleNavigate}>
            Trang chủ
          </NavLink>
          <NavLink to="/doctors" className={linkClass} onClick={handleNavigate}>
            Đội ngũ bác sĩ
          </NavLink>
          <NavLink to="/about" className={linkClass} onClick={handleNavigate}>
            Về chúng tôi
          </NavLink>
          <NavLink to="/contact" className={linkClass} onClick={handleNavigate}>
            Liên hệ
          </NavLink>

          <div className="pt-2">
            {!user ? (
              <Link
                to="/login"
                onClick={handleNavigate}
                className="block w-full text-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-600 hover:text-white transition"
              >
                Đăng nhập
              </Link>
            ) : (
              <button
                onClick={() => {
                  logout()
                  handleNavigate()
                }}
                className="w-full px-3 py-2 rounded-lg border border-slate-300 text-slate-700 hover:bg-slate-100 text-sm"
              >
                Đăng xuất
              </button>
            )}
          </div>
        </div>
      )}
    </header>
  )
}
