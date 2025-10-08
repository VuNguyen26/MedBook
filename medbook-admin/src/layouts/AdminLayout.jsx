import { Outlet } from "react-router-dom"
import AdminHeader from "@components/AdminHeader"
import AdminSidebar from "@components/AdminSidebar"

export default function AdminLayout() {
  return (
    <div className="flex h-screen bg-background">
      <AdminSidebar />
      <div className="flex flex-1 flex-col">
        <AdminHeader />
        <main className="flex-1 overflow-y-auto p-6">
          <Outlet />
        </main>
      </div>
    </div>
  )
}
