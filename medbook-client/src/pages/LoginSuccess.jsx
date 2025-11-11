import { useEffect, useRef } from "react";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useAuth } from "../store/AuthContext";
import { jwtDecode } from "jwt-decode";

export default function LoginSuccess() {
  const navigate = useNavigate();
  const { login } = useAuth();
  const hasRun = useRef(false);

  useEffect(() => {
    if (hasRun.current) return;
    hasRun.current = true;

    const params = new URLSearchParams(window.location.search);
    const token = params.get("token");

    if (!token) {
      toast.error("Không thể xác thực người dùng từ OAuth2!", { theme: "colored" });
      setTimeout(() => navigate("/login", { replace: true }), 2000);
      return;
    }

    let email = null;
    let role = "PATIENT";

    try {
      const decoded = jwtDecode(token);
      email = decoded.sub;
      role = decoded.role || "PATIENT";
      console.log("OAuth2 Token Decoded:", decoded);
    } catch (err) {
      console.warn("Không thể decode token, dùng giá trị mặc định:", err);
    }

    try {
      // Lưu user vào context và localStorage
      login(token, { email, role });

      // Đảm bảo ToastContainer đã render, hiển thị mượt hơn
      setTimeout(() => {
        toast.dismiss(); // xoá toast cũ (nếu có)
        toast.success("Đăng nhập thành công!", {
          theme: "colored",
          autoClose: 1500,
        });
      }, 200);

      // Chuyển hướng theo vai trò
      setTimeout(() => {
        if (role === "ADMIN") navigate("/admin/dashboard", { replace: true });
        else if (role === "DOCTOR") navigate("/doctor/schedule", { replace: true });
        else navigate("/", { replace: true });
      }, 1600);
    } catch (error) {
      console.error("Lỗi khi lưu thông tin đăng nhập:", error);
      toast.error("Lỗi khi xử lý token đăng nhập!", { theme: "colored" });
      setTimeout(() => navigate("/login", { replace: true }), 2000);
    }
  }, [navigate, login]);

  return (
    <div className="flex flex-col items-center justify-center min-h-screen bg-gradient-to-br from-blue-50 to-cyan-50">
      <div className="bg-white p-10 rounded-3xl shadow-xl text-center w-[90%] max-w-md">
        <h1 className="text-3xl font-bold text-green-600 mb-3">
          Đăng nhập thành công!
        </h1>
        <p className="text-gray-600 mb-6">
          Hệ thống đang xử lý và chuyển hướng đến trang phù hợp...
        </p>
        <div className="animate-spin h-10 w-10 border-4 border-blue-400 border-t-transparent rounded-full mx-auto"></div>
      </div>
    </div>
  );
}
