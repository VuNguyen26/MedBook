import { Routes, Route, useLocation } from "react-router-dom";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

// Components
import NavBar from "./components/NavBar.jsx";
import RequireAuth from "./components/RequireAuth.jsx";
import ScrollToTop from "./components/ScrollToTop.jsx";
import Footer from "./components/Footer.jsx";

// Pages
import Contact from "./pages/Contact.jsx";
import Home from "./pages/Home.jsx";
import Specialties from "./pages/Specialties.jsx";
import Doctors from "./pages/Doctors.jsx";
import DoctorDetail from "./pages/DoctorDetail.jsx";
import Payment from "./pages/Payment.jsx";
import Patient from "./pages/Patient.jsx";
import DoctorBoard from "./pages/DoctorBoard.jsx";
import Login from "./pages/Login.jsx";
import NotFound from "./pages/NotFound.jsx";
import Register from "./pages/Register.jsx";
import About from "./pages/About.jsx";
import ForgotPassword from "./pages/ForgotPassword.jsx";
import ResetPassword from "./pages/ResetPassword.jsx";
import TestApi from "./pages/TestApi.jsx";

// Context
import { AuthProvider } from "./store/AuthContext";

export default function App() {
  const location = useLocation();

// Ẩn NavBar + Footer cho các trang auth
  const hideLayout = ["/login", "/register", "/forgot-password", "/reset-password",].includes(location.pathname);

  return (
    <AuthProvider>
      <div className="min-h-screen flex flex-col">
        {/* NavBar (ẩn ở trang login/register) */}
        {!hideLayout && <NavBar />}

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

            {/* Trang test kết nối API qua Gateway (chỉ khi đã login) */}
            <Route
              path="/testapi"
              element={
                <RequireAuth>
                  <TestApi />
                </RequireAuth>
              }
            />

            {/* Danh sách bác sĩ + chi tiết bác sĩ */}
            <Route path="/specialties" element={<Specialties />} />
            <Route path="/doctors" element={<Doctors />} />
            <Route path="/doctors/:id" element={<DoctorDetail />} />

            {/* Protected routes */}
            <Route
              path="/payment/:appointmentId"
              element={
                <RequireAuth roles={["PATIENT"]}>
                  <Payment />
                </RequireAuth>
              }
            />

            <Route
              path="/patient"
              element={
                <RequireAuth roles={["PATIENT"]}>
                  <Patient />
                </RequireAuth>
              }
            />

            <Route
              path="/doctor"
              element={
                <RequireAuth roles={["DOCTOR"]}>
                  <DoctorBoard />
                </RequireAuth>
              }
            />

            {/* 404 Not Found */}
            <Route path="*" element={<NotFound />} />
          </Routes>
        </main>

        {/* Footer (ẩn ở trang login/register) */}
        {!hideLayout && <Footer />}

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
    </AuthProvider>
  );
}
