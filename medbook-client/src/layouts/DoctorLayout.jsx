import { Outlet, NavLink, useNavigate } from "react-router-dom";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

export default function DoctorLayout() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  const navItems = [
    { to: "/doctor/schedule", label: "Lịch khám" },
    { to: "/doctor/patients", label: "Bệnh nhân" },
    { to: "/doctor/tasks", label: "Công việc" },
    { to: "/doctor/records", label: "Hồ sơ" },
  ];

  const handleLogout = () => {
    toast.info("Đã đăng xuất khỏi hệ thống", {
      theme: "colored",
      autoClose: 1000,
    });
    logout();
    setTimeout(() => {
      navigate("/login", { replace: true });
    }, 1000);
  };

  return (
    <div className="min-h-screen bg-gray-50 flex flex-col">
      {/* Header */}
      <header className="bg-white shadow-sm p-4 flex justify-between items-center">
        <h1 className="text-xl font-bold text-teal-700">👨‍⚕️ Doctor Panel</h1>
        <div className="flex items-center gap-4">
          <span className="text-gray-700 text-sm">{user?.email}</span>
          <button
            onClick={handleLogout}
            className="px-3 py-1.5 text-sm bg-red-500 hover:bg-red-600 text-white rounded-md transition"
          >
            Đăng xuất
          </button>
        </div>
      </header>

      {/* Navigation */}
      <nav className="bg-teal-700 text-white flex gap-6 px-6 py-2 text-sm">
        {navItems.map((item) => (
          <NavLink
            key={item.to}
            to={item.to}
            className={({ isActive }) =>
              isActive
                ? "font-semibold border-b-2 border-white"
                : "opacity-80 hover:opacity-100"
            }
          >
            {item.label}
          </NavLink>
        ))}
      </nav>

      {/* Main Content */}
      <main className="flex-1 p-6">
        <Outlet />
      </main>

      {/* Footer */}
      <footer className="text-center py-3 text-xs text-gray-500">
        © 2025 MedBook. Bảo mật thông tin y tế.
      </footer>
    </div>
  );
}
