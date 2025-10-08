// src/App.jsx
import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"
import { auth } from "./store/auth"

// Pages
import Login from "./pages/Login"

// Layouts
import AdminLayout from "./layouts/AdminLayout"

// Admin pages
import Dashboard from "./pages/Dashboard"
import Doctors from "./pages/Doctors"
import Payments from "./pages/Payments"
import Reports from "./pages/Reports"
import Users from "./pages/Users"

// Doctor pages
import DoctorSchedule from "./doctor/DoctorSchedule"
import DoctorPatients from "./doctor/DoctorPatients"
import DoctorTasks from "./doctor/DoctorTasks"
import DoctorRecords from "./doctor/DoctorRecords"

// Route guards
import RequireAdmin from "./components/routes/RequireAdmin"
import RequireDoctor from "./components/routes/RequireDoctor"

export default function App() {
  return (
    <BrowserRouter>
      <Routes>
        {/* Trang mặc định → login */}
        <Route path="/" element={<Navigate to="/login" replace />} />

        {/* Login */}
        <Route path="/login" element={<Login />} />

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
          <Route path="/doctor/schedule" element={<DoctorSchedule />} />
          <Route path="/doctor/patients" element={<DoctorPatients />} />
          <Route path="/doctor/tasks" element={<DoctorTasks />} />
          <Route path="/doctor/records" element={<DoctorRecords />} />
        </Route>

        {/* Fallback */}
        <Route path="*" element={<Navigate to="/login" replace />} />
      </Routes>

      {/* ✅ ToastContainer hiển thị toàn app */}
      <ToastContainer position="top-right" autoClose={2000} theme="colored" />
    </BrowserRouter>
  )
}
