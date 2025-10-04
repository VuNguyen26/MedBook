import { Link, Outlet } from "react-router-dom"
import { auth } from "../store/auth"

export default function AdminLayout() {
  const user = auth.getCurrentUser()

  return (
    <div className="flex min-h-screen">
      {/* Sidebar */}
      <aside className="w-64 bg-slate-900 text-white p-6 space-y-4">
        <h1 className="text-xl font-bold">Panel</h1>
        <nav className="flex flex-col space-y-2">
          {user?.role === "admin" && (
            <>
              <Link to="/dashboard">Dashboard</Link>
              <Link to="/users">Users</Link>
              <Link to="/doctors">Doctors</Link>
              <Link to="/payments">Payments</Link>
              <Link to="/reports">Reports</Link>
            </>
          )}

          {user?.role === "doctor" && (
            <>
              <Link to="/doctor-schedule">Lịch khám</Link>
              <Link to="/doctor-patients">Bệnh nhân</Link>
              <Link to="/doctor-tasks">Công việc</Link>
              <Link to="/doctor-records">Hồ sơ khám</Link>
            </>
          )}
        </nav>
      </aside>

      {/* Main content */}
      <main className="flex-1 p-6 bg-slate-50">
        <Outlet />
      </main>
    </div>
  )
}
