import { Routes, Route, useLocation, Navigate } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// ===== Components =====
import NavBar from "@/components/NavBar.jsx";
import ScrollToTop from "@/components/ScrollToTop.jsx";
import Footer from "@/components/Footer.jsx";
import RequireAuth from "@/components/RequireAuth.jsx";
import RequireRole from "@/components/RequireRole.jsx";

// ===== Layouts =====
import AdminLayout from "@/layouts/AdminLayout.jsx";
import DoctorLayout from "@/layouts/DoctorLayout.jsx";

// ===== Pages (Patient/Public) =====
import Home from "@/pages/Home.jsx";
import About from "@/pages/About.jsx";
import Contact from "@/pages/Contact.jsx";
import Specialties from "@/pages/Specialties.jsx";
import Doctors from "@/pages/Doctors.jsx";
import DoctorDetail from "@/pages/DoctorDetail.jsx";
import Patient from "@/pages/Patient.jsx";
import Payment from "@/pages/Payment.jsx";

// ===== Pages (Auth) =====
import Login from "@/pages/Login.jsx";
import Register from "@/pages/Register.jsx";
import ForgotPassword from "@/pages/ForgotPassword.jsx";
import ResetPassword from "@/pages/ResetPassword.jsx";
import LoginSuccess from "@/pages/LoginSuccess.jsx";

// ===== Pages (Legal) =====
import TermsOfService from "@/pages/TermsOfService.jsx";
import PrivacyPolicy from "@/pages/PrivacyPolicy.jsx";

// ===== Pages (Admin) =====
import Dashboard from "@/pages/admin/Dashboard.jsx";
import AdminDoctors from "@/pages/admin/Doctors.jsx";
import Reports from "@/pages/admin/Reports.jsx";
import Users from "@/pages/admin/Users.jsx";
import Payments from "@/pages/admin/Payments.jsx";

// ===== Pages (Doctor) =====
import DoctorSchedule from "@/pages/doctor/DoctorSchedule.jsx";
import DoctorPatients from "@/pages/doctor/DoctorPatients.jsx";
import DoctorRecords from "@/pages/doctor/DoctorRecords.jsx";
import DoctorTasks from "@/pages/doctor/DoctorTasks.jsx";

// ===== Misc Pages =====
import NotFound from "@/pages/NotFound.jsx";
import TestApi from "@/pages/TestApi.jsx";

export default function App() {
  const location = useLocation();

  // Ẩn NavBar + Footer cho các trang auth, pháp lý, admin, doctor, login success
  const hideLayout =
    [
      "/login",
      "/login/success",
      "/register",
      "/forgot-password",
      "/reset-password",
      "/terms",
      "/privacy",
    ].includes(location.pathname) ||
    location.pathname.startsWith("/admin")

  return (
    <div className="min-h-screen flex flex-col">
      {!hideLayout && <NavBar />}
      <ScrollToTop />

      <main className="flex-1">
        <Routes>cd medbook
          {/* ===================== PUBLIC ROUTES ===================== */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />

          {/* ===================== AUTH ROUTES ===================== */}
          <Route path="/login" element={<Login />} />
          <Route path="/login/success" element={<LoginSuccess />} />
          <Route path="/register" element={<Register />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />
          <Route path="/terms" element={<TermsOfService />} />
          <Route path="/privacy" element={<PrivacyPolicy />} />

          {/* ===================== PATIENT ROUTES ===================== */}
          <Route
            path="/patient"
            element={
              <RequireAuth roles={["PATIENT"]}>
                <Patient />
              </RequireAuth>
            }
          />
          <Route
            path="/payment/:appointmentId"
            element={
              <RequireAuth roles={["PATIENT"]}>
                <Payment />
              </RequireAuth>
            }
          />

          {/* ===================== DOCTOR ROUTES ===================== */}
          <Route element={<RequireRole allowedRoles={["DOCTOR"]} />}>
            <Route path="/doctor" element={<DoctorLayout />}>
              <Route path="schedule" element={<DoctorSchedule />} />
              <Route path="patients" element={<DoctorPatients />} />
              <Route path="records" element={<DoctorRecords />} />
              <Route path="tasks" element={<DoctorTasks />} />
            </Route>
          </Route>

          {/* ===================== ADMIN ROUTES ===================== */}
          <Route element={<RequireRole allowedRoles={["ADMIN"]} />}>
            <Route path="/admin" element={<AdminLayout />}>
              <Route index element={<Navigate to="dashboard" replace />} />
              <Route path="dashboard" element={<Dashboard />} />
              <Route path="reports" element={<Reports />} />
              <Route path="users" element={<Users />} />
              <Route path="doctors" element={<AdminDoctors />} />
              <Route path="payments" element={<Payments />} />
            </Route>
          </Route>

          {/* ===================== MISC ===================== */}
          <Route
            path="/testapi"
            element={
              <RequireAuth>
                <TestApi />
              </RequireAuth>
            }
          />
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideLayout && <Footer />}

      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  );
}
