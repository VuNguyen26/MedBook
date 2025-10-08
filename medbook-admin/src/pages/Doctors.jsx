import { useState } from "react"
import DoctorsTable from "../components/DoctorsTable"
import { Plus, Download } from "lucide-react"

export default function Doctors() {
  const [tab, setTab] = useState("all")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Doctors Management
          </h1>
          <p className="text-gray-500">Manage doctor profiles and schedules</p>
        </div>
        <div className="flex gap-3">
  {/* 🟡 Nút Export - nền vàng nhạt, nhẹ nhàng */}
  <button
    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
              text-yellow-700 bg-gradient-to-r from-yellow-100 to-amber-100 
              border border-yellow-300 rounded-lg shadow-sm 
              hover:from-yellow-150 hover:to-amber-200 hover:shadow-md 
              transition-all duration-300"
  >
    <Download className="h-4 w-4 text-yellow-600" />
    Export
  </button>

  {/* 🔵 Nút Add Doctor - xanh gradient nổi bật */}
  <button
    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
              text-white bg-gradient-to-r from-teal-500 to-cyan-500 
              rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 
              hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
  >
    <Plus className="h-4 w-4 text-white" />
    Add Doctor
  </button>
</div>

      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Total Doctors</p>
          <h2 className="text-2xl font-bold">48</h2>
          <p className="text-xs text-gray-400">Across 12 specialties</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">On Duty Today</p>
          <h2 className="text-2xl font-bold">42</h2>
          <p className="text-xs text-green-600">87.5% availability</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Avg. Rating</p>
          <h2 className="text-2xl font-bold">4.8</h2>
          <p className="text-xs text-gray-400">Based on 2,847 reviews</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">On Leave</p>
          <h2 className="text-2xl font-bold">6</h2>
          <p className="text-xs text-red-600">12.5% unavailable</p>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-4 border-b">
          {["all", "available", "busy", "leave"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 -mb-px border-b-2 ${
                tab === t
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              {t === "all" && "All Doctors"}
              {t === "available" && "Available"}
              {t === "busy" && "Busy"}
              {t === "leave" && "On Leave"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tab === "all" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">All Doctors</h2>
              <DoctorsTable />
            </div>
          )}
          {tab === "available" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">Available Doctors</h2>
              <DoctorsTable filter="available" />
            </div>
          )}
          {tab === "busy" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">Busy Doctors</h2>
              <DoctorsTable filter="busy" />
            </div>
          )}
          {tab === "leave" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">Doctors On Leave</h2>
              <DoctorsTable filter="leave" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
