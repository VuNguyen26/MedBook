import { Routes, Route, useLocation } from "react-router-dom"
import { ToastContainer } from "react-toastify"
import "react-toastify/dist/ReactToastify.css"

import NavBar from "./components/NavBar.jsx"
import RequireAuth from "./components/RequireAuth.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import Footer from "./components/Footer.jsx"
import Contact from "./pages/Contact.jsx" 
import Home from "./pages/Home.jsx"
import Specialties from "./pages/Specialties.jsx"
import Doctors from "./pages/Doctors.jsx"
import DoctorDetail from "./pages/DoctorDetail.jsx"
import Payment from "./pages/Payment.jsx"
import Patient from "./pages/Patient.jsx"
import DoctorBoard from "./pages/DoctorBoard.jsx"
import Admin from "./pages/Admin.jsx"
import Login from "./pages/Login.jsx"
import NotFound from "./pages/NotFound.jsx"
import Register from "./pages/Register.jsx"
import About from "./pages/About.jsx"
import ForgotPassword from "./pages/ForgotPassword.jsx"
import ResetPassword from "./pages/ResetPassword.jsx"

export default function App() {
  const location = useLocation()
  // Các trang không có Footer
  const hideFooter = ["/login", "/register"].includes(location.pathname)

  return (
    <div className="min-h-screen flex flex-col">
      <NavBar />
      <ScrollToTop />

      <main className="flex-1">
        <Routes>
          {/* Public routes */}
          <Route path="/" element={<Home />} />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} /> 
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/reset-password" element={<ResetPassword />} />

          {/* Danh sách bác sĩ + chi tiết bác sĩ */}
          <Route path="/specialties" element={<Specialties />} />
          <Route path="/doctors" element={<Doctors />} />
          <Route path="/doctors/:id" element={<DoctorDetail />} />
          
          {/* Protected routes */}
          <Route
            path="/payment/:appointmentId"
            element={
              <RequireAuth roles={["patient"]}>
                <Payment />
              </RequireAuth>
            }
          />
          <Route
            path="/patient"
            element={
              <RequireAuth roles={["patient"]}>
                <Patient />
              </RequireAuth>
            }
          />
          <Route
            path="/doctor"
            element={
              <RequireAuth roles={["doctor"]}>
                <DoctorBoard />
              </RequireAuth>
            }
          />
          <Route
            path="/admin"
            element={
              <RequireAuth roles={["admin"]}>
                <Admin />
              </RequireAuth>
            }
          />

          {/* 404 */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </main>

      {!hideFooter && <Footer />}

      {/* Toast notifications */}
      <ToastContainer
        position="top-right"
        autoClose={3000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        pauseOnHover
        draggable
        theme="colored"
      />
    </div>
  )
}
