import { Link, useLocation, useNavigate } from "react-router-dom";
import {
  LayoutDashboard,
  Users,
  Stethoscope,
  CreditCard,
  FileText,
  LogOut,
  Activity,
} from "lucide-react";
import { Button } from "../ui/button";
import { useAuth } from "@/store/AuthContext";
import { toast } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

const navigation = [
  { name: "Dashboard", href: "/admin/dashboard", icon: LayoutDashboard },
  { name: "Users", href: "/admin/users", icon: Users },
  { name: "Doctors", href: "/admin/doctors", icon: Stethoscope },
  { name: "Payments", href: "/admin/payments", icon: CreditCard },
  { name: "Reports", href: "/admin/reports", icon: FileText },
];

export default function AdminSidebar() {
  const location = useLocation();
  const pathname = location.pathname;
  const navigate = useNavigate();
  const { logout } = useAuth();
  // Hàm xử lý đăng xuất
  const handleLogout = () => {
    toast.info("Đã đăng xuất khỏi hệ thống", {
      theme: "colored",
      autoClose: 1000,
    });

    logout(); // Xóa user/token
    setTimeout(() => navigate("/login", { replace: true }), 1000);
  };

  return (
    <aside className="flex h-full w-64 flex-col border-r border-slate-200 bg-white shadow-sm">
      {/* Logo/Header */}
      <div className="flex h-16 items-center gap-3 border-b border-slate-200 px-5">
        <Activity className="h-6 w-6 text-teal-600" />
        <div className="flex flex-col leading-tight">
          <span className="text-lg font-bold text-teal-700 tracking-tight">
            MedBook
          </span>
          <span className="text-xs text-slate-500">Admin Dashboard</span>
        </div>
      </div>

      {/* Navigation */}
      <nav className="flex-1 space-y-1 p-4">
        {navigation.map((item) => {
          const isActive = pathname === item.href;
          return (
            <Link
              key={item.name}
              to={item.href}
              className={`flex items-center gap-3 rounded-lg px-3 py-2.5 text-sm font-medium transition-all duration-150 ${
                isActive
                  ? "bg-teal-600 text-white shadow-sm"
                  : "text-slate-600 hover:bg-slate-100 hover:text-teal-700"
              }`}
            >
              <item.icon
                className={`h-5 w-5 ${
                  isActive ? "text-white" : "text-slate-500"
                }`}
              />
              {item.name}
            </Link>
          );
        })}
      </nav>

      {/* Logout Button */}
      <div className="border-t border-slate-200 p-4">
        <Button
          variant="ghost"
          className="w-full justify-start gap-3 text-slate-600 hover:text-red-600 hover:bg-red-50"
          onClick={handleLogout}
        >
          <LogOut className="h-5 w-5" />
          Đăng xuất
        </Button>
      </div>
    </aside>
  );
}
