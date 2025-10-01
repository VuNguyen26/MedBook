import { Routes, Route } from "react-router-dom"
import NavBar from "./components/NavBar.jsx"
import RequireAuth from "./components/RequireAuth.jsx"
import ScrollToTop from "./components/ScrollToTop.jsx"
import Contact from "./pages/Contact.jsx" 
import Home from "./pages/Home.jsx"
import Specialties from "./pages/Specialties.jsx"
import Doctors from "./pages/Doctors.jsx"
import DoctorDetail from "./pages/DoctorDetail.jsx"
import Payment from "./pages/Payment.jsx"
import Patient from "./pages/Patient.jsx"
import DoctorBoard from "./pages/DoctorBoard.jsx"
import Staff from "./pages/Staff.jsx"
import Admin from "./pages/Admin.jsx"
import Login from "./pages/Login.jsx"
import NotFound from "./pages/NotFound.jsx"
import Register from "./pages/Register.jsx"
import About from "./pages/About.jsx"

export default function App() {
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
            path="/staff"
            element={
              <RequireAuth roles={["staff"]}>
                <Staff />
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
    </div>
  )
}
