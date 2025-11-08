import { Link, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { useState } from "react";
import { Menu, X, User, Stethoscope, LogOut, Calendar, Home } from "lucide-react";
import { toast } from "react-toastify";

export default function NavBar() {
  const [open, setOpen] = useState(false);
  const [dropdown, setDropdown] = useState(false);
  const { user, logout } = useAuth();
  const nav = useNavigate();

  const linkClass = ({ isActive }) =>
    "relative inline-block px-3 py-2 font-medium transition " +
    (isActive
      ? "text-blue-600 after:content-[''] after:absolute after:left-0 after:bottom-0 after:h-[2px] after:w-full after:bg-blue-600"
      : "text-slate-700 hover:text-blue-600 " +
        "after:content-[''] after:absolute after:left-1/2 after:bottom-0 after:h-[2px] after:w-0 after:bg-blue-600 " +
        "after:transition-all after:duration-300 hover:after:left-0 hover:after:w-full");

  const handleNavigate = () => {
    window.scrollTo({ top: 0, behavior: "smooth" });
    setOpen(false);
    setDropdown(false);
  };

  const handleLogout = () => {
    logout();
    setDropdown(false);
    nav("/");
    toast.info("Bạn đã đăng xuất khỏi hệ thống!", {
      theme: "colored",
      autoClose: 3000,
      pauseOnHover: false,
    });
  };

  return (
    <header className="bg-white border-b border-slate-200 sticky top-0 z-50 shadow-sm">
      <div className="max-w-7xl mx-auto flex items-center justify-between py-3 px-6">
        {/* Logo - SIÊU XỊN */}
        <Link
          to="/"
          onClick={handleNavigate}
          className="flex items-center gap-2 group"
        >
          <div className="p-2 bg-gradient-to-br from-blue-600 to-cyan-600 rounded-xl shadow-md group-hover:shadow-lg transition-all duration-300">
            <Stethoscope className="h-6 w-6 text-white" />
          </div>
          <div className="font-bold text-slate-900 text-lg">MedBook</div>
        </Link>

        {/* Desktop Navigation */}
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

        {/* User Actions - SIÊU HIỆN ĐẠI */}
        <div className="hidden md:flex items-center gap-4 relative">
          {!user ? (
            <Link
              to="/login"
              onClick={handleNavigate}
              className="px-6 py-2.5 bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium rounded-xl shadow-md hover:shadow-lg hover:from-blue-700 hover:to-cyan-700 transition-all duration-300 transform hover:scale-105"
            >
              Đăng nhập
            </Link>
          ) : (
            <div className="flex items-center gap-3">
              {/* Tên người dùng + role */}
              <div className="text-right hidden lg:block">
                <p className="text-xs text-slate-500">Xin chào</p>
                <p className="font-semibold text-slate-800 truncate max-w-32">
                  {user.email?.split("@")[0] || "Người dùng"}
                </p>
              </div>

              {/* Avatar + Dropdown Toggle */}
              <button
                onClick={() => setDropdown(!dropdown)}
                className="relative p-1.5 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 shadow-lg hover:shadow-xl transition-all duration-300 group focus:outline-none focus:ring-2 focus:ring-blue-300"
              >
                <div className="p-2 bg-white rounded-full group-hover:scale-95 transition-transform">
                  <User size={20} className="text-blue-600" />
                </div>
                <div className="absolute inset-0 rounded-full bg-gradient-to-br from-blue-500 to-cyan-500 opacity-0 group-hover:opacity-50 blur-md transition-opacity"></div>
              </button>

              {/* Dropdown Menu - SIÊU XỊN */}
              {dropdown && (
                <div className="absolute right-0 top-14 w-52 bg-white rounded-2xl shadow-2xl border border-slate-100 overflow-hidden z-50 animate-in fade-in slide-in-from-top-2 duration-200">
                  {/* Header */}
                  <div className="px-4 py-3 bg-gradient-to-r from-blue-50 to-cyan-50 border-b border-slate-100">
                    <p className="text-xs font-medium text-slate-600">Tài khoản</p>
                    <p className="text-sm font-semibold text-slate-800 truncate">{user.email}</p>
                    <p className="text-xs text-blue-600 mt-1">
                      {user.role === "PATIENT" ? "Bệnh nhân" : "Bác sĩ"}
                    </p>
                  </div>

                  {/* Menu Items */}
                  <div className="py-2">
                    {user.role === "PATIENT" && (
                      <Link
                        to="/patient"
                        onClick={handleNavigate}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <Calendar className="h-4 w-4" />
                        Lịch hẹn của tôi
                      </Link>
                    )}
                    {user.role === "DOCTOR" && (
                      <Link
                        to="/doctor"
                        onClick={handleNavigate}
                        className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                      >
                        <Stethoscope className="h-4 w-4" />
                        Bảng điều khiển
                      </Link>
                    )}
                    <Link
                      to="/"
                      onClick={handleNavigate}
                      className="flex items-center gap-3 px-4 py-2.5 text-sm text-slate-700 hover:bg-blue-50 hover:text-blue-600 transition"
                    >
                      <Home className="h-4 w-4" />
                      Trang chủ
                    </Link>
                  </div>

                  {/* Logout - NỔI BẬT */}
                  <div className="border-t border-slate-100 pt-2">
                    <button
                      onClick={handleLogout}
                      className="w-full flex items-center justify-center gap-2 px-4 py-3 text-sm font-medium text-red-600 hover:bg-red-50 hover:text-red-700 transition-all duration-200 group"
                    >
                      <LogOut className="h-4 w-4 group-hover:scale-110 transition-transform" />
                      Đăng xuất
                    </button>
                  </div>
                </div>
              )}
            </div>
          )}
        </div>

        {/* Mobile Menu Toggle */}
        <button
          className="md:hidden p-2 text-slate-700 hover:text-blue-600 transition"
          onClick={() => setOpen(!open)}
        >
          {open ? <X size={24} /> : <Menu size={24} />}
        </button>
      </div>

      {/* Mobile Menu - SIÊU ĐẸP */}
      {open && (
        <div className="md:hidden border-t border-slate-200 bg-white px-6 py-4 space-y-3">
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

          <div className="pt-3 border-t border-slate-200">
            {!user ? (
              <Link
                to="/login"
                onClick={handleNavigate}
                className="block w-full text-center px-4 py-2.5 rounded-xl bg-gradient-to-r from-blue-600 to-cyan-600 text-white font-medium shadow-md hover:shadow-lg transition-all"
              >
                Đăng nhập
              </Link>
            ) : (
              <>
                <div className="text-sm text-slate-600 mb-2">
                  Xin chào, <b>{user.email?.split("@")[0]}</b>
                </div>
                {user.role === "PATIENT" && (
                  <Link
                    to="/patient"
                    onClick={handleNavigate}
                    className="block w-full text-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 mb-2"
                  >
                    Lịch hẹn
                  </Link>
                )}
                {user.role === "DOCTOR" && (
                  <Link
                    to="/doctor"
                    onClick={handleNavigate}
                    className="block w-full text-center px-4 py-2 rounded-lg border border-blue-600 text-blue-600 hover:bg-blue-50 mb-2"
                  >
                    Bảng điều khiển
                  </Link>
                )}
                <button
                  onClick={handleLogout}
                  className="w-full px-4 py-2.5 rounded-lg bg-red-50 text-red-600 font-medium hover:bg-red-100 transition"
                >
                  Đăng xuất
                </button>
              </>
            )}
          </div>
        </div>
      )}
    </header>
  );
}