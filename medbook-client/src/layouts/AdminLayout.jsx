import { Outlet } from "react-router-dom";
import AdminHeader from "../components/admin/AdminHeader";
import AdminSidebar from "../components/admin/AdminSidebar";
import { useAuth } from "../store/AuthContext";
import { toast } from "react-toastify";

export default function AdminLayout() {
  const { logout } = useAuth();

  const handleLogout = () => {
    toast.info("Đã đăng xuất khỏi hệ thống", {
      theme: "colored",
      autoClose: 1000,
    });
    logout();
  };

  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        {/* Header có nút Đăng xuất */}
        <AdminHeader onLogout={handleLogout} />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  );
}
