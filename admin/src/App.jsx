import { BrowserRouter, Routes, Route, Navigate } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import Login from "./Login"
import AdminLayout from "./layouts/AdminLayout"
import ThemeToggle from "./components/ThemeToggle"

// Admin pages
import Dashboard from "./pages/Dashboard"
import Users from "./pages/Users"
import Doctors from "./pages/Doctors"
import Payments from "./pages/Payments"
import Reports from "./pages/Reports"

// Doctor pages (chuyển qua thư mục riêng)
import DoctorSchedule from "./doctor/DoctorSchedule"
import DoctorPatients from "./doctor/DoctorPatients"
import DoctorTasks from "./doctor/DoctorTasks"
import DoctorRecords from "./doctor/DoctorRecords"

import RequireAdmin from "./components/RequireAdmin"

export default function App() {
  return (
    <BrowserRouter>
      {/* Wrapper cho theme sáng/tối */}
      <div className="min-h-screen bg-gray-50 dark:bg-gray-900 text-gray-900 dark:text-gray-100 transition-colors">
        <Routes>
          {/* Public */}
          <Route path="/login" element={<Login />} />

          {/* Protected */}
          <Route element={<RequireAdmin />}>
            <Route element={<AdminLayout />}>
              {/* Admin routes */}
              <Route path="/dashboard" element={<Dashboard />} />
              <Route path="/users" element={<Users />} />
              <Route path="/doctors" element={<Doctors />} />
              <Route path="/payments" element={<Payments />} />
              <Route path="/reports" element={<Reports />} />

              {/* Doctor routes */}
              <Route path="/doctor-schedule" element={<DoctorSchedule />} />
              <Route path="/doctor-patients" element={<DoctorPatients />} />
              <Route path="/doctor-tasks" element={<DoctorTasks />} />
              <Route path="/doctor-records" element={<DoctorRecords />} />
            </Route>
          </Route>

          {/* Redirect từ "/" -> "/login" */}
          <Route path="/" element={<Navigate to="/login" replace />} />

          {/* 404 page */}
          <Route
            path="*"
            element={<h1 className="p-10 text-center">404 - Not Found</h1>}
          />
        </Routes>

        {/* Toggle theme */}
        <ThemeToggle />
      </div>

      <ToastContainer position="top-right" autoClose={3000} theme="colored" />
    </BrowserRouter>
  )
}
