// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Context
import { AuthProvider, useAuth } from "./store/AuthContext";

// Pages
import Login from "./pages/Login";
import TestApi from "./pages/TestApi";

// Layouts
import AdminLayout from "./layouts/AdminLayout";
import DoctorLayout from "./layouts/DoctorLayout";

// Admin pages
import Dashboard from "./pages/Dashboard";
import Doctors from "./pages/Doctors";
import Payments from "./pages/Payments";
import Reports from "./pages/Reports";
import Users from "./pages/Users";

// Doctor pages
import DoctorSchedule from "./doctor/DoctorSchedule";
import DoctorPatients from "./doctor/DoctorPatients";
import DoctorTasks from "./doctor/DoctorTasks";
import DoctorRecords from "./doctor/DoctorRecords";

// Route guards
import RequireAdmin from "./components/routes/RequireAdmin";
import RequireDoctor from "./components/routes/RequireDoctor";

// Wrapper component để xử lý redirect login theo role
function AppRoutes() {
  const { user, isAuthenticated } = useAuth();

  // Khi AuthContext đang khởi tạo
  if (user === undefined) {
    return (
      <div className="flex items-center justify-center h-screen">
        <p className="text-gray-600">Đang tải...</p>
      </div>
    );
  }

  return (
    <Routes>
      {/* Mặc định về /login */}
      <Route path="/" element={<Navigate to="/login" replace />} />

      {/* Public routes */}
      <Route
        path="/login"
        element={
          isAuthenticated ? (
            user?.role === "ADMIN" ? (
              <Navigate to="/admin/dashboard" replace />
            ) : (
              <Navigate to="/doctor/schedule" replace />
            )
          ) : (
            <Login />
          )
        }
      />
      <Route path="/test-api" element={<TestApi />} />

      {/* ================== ADMIN AREA ================== */}
      <Route element={<RequireAdmin />}>
        <Route path="/admin" element={<AdminLayout />}>
          <Route index element={<Dashboard />} />
          <Route path="dashboard" element={<Dashboard />} />
          <Route path="doctors" element={<Doctors />} />
          <Route path="payments" element={<Payments />} />
          <Route path="reports" element={<Reports />} />
          <Route path="users" element={<Users />} />
        </Route>
      </Route>

      {/* ================== DOCTOR AREA ================== */}
      <Route element={<RequireDoctor />}>
        <Route path="/doctor" element={<DoctorLayout />}>
          <Route index element={<Navigate to="schedule" replace />} />
          <Route path="schedule" element={<DoctorSchedule />} />
          <Route path="patients" element={<DoctorPatients />} />
          <Route path="tasks" element={<DoctorTasks />} />
          <Route path="records" element={<DoctorRecords />} />
        </Route>
      </Route>

      {/* Fallback route */}
      <Route path="*" element={<Navigate to="/login" replace />} />
    </Routes>
  );
}

// App chính
export default function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <AppRoutes />
        <ToastContainer position="top-right" autoClose={2500} theme="colored" />
      </AuthProvider>
    </BrowserRouter>
  );
}
