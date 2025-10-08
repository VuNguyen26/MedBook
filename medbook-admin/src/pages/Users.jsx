import { useState } from "react"
import UsersTable from "../components/UsersTable"
import { Plus, Download } from "lucide-react"

export default function Users() {
  const [tab, setTab] = useState("all")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Users Management</h1>
          <p className="text-gray-500">Manage patient accounts and information</p>
        </div>
        <div className="flex gap-3">
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

            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                        text-white bg-gradient-to-r from-teal-500 to-cyan-500 
                        rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 
                        hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              <Plus className="h-4 w-4 text-white" />
              Add User
            </button>
          </div>
      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Total Users</p>
          <h2 className="text-2xl font-bold">2,847</h2>
          <p className="text-xs text-gray-500">+180 from last month</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Active Users</p>
          <h2 className="text-2xl font-bold">2,654</h2>
          <p className="text-xs text-green-600">93.2% active rate</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">New This Month</p>
          <h2 className="text-2xl font-bold">180</h2>
          <p className="text-xs text-gray-500">+12% from last month</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Inactive Users</p>
          <h2 className="text-2xl font-bold">193</h2>
          <p className="text-xs text-red-600">6.8% inactive</p>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-4 border-b">
          {["all", "active", "inactive", "blocked"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 -mb-px border-b-2 ${
                tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
              }`}
            >
              {t === "all" && "All Users"}
              {t === "active" && "Active"}
              {t === "inactive" && "Inactive"}
              {t === "blocked" && "Blocked"}
            </button>
          ))}
        </div>

        {/* All Users */}
        {tab === "all" && (
          <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
            <h2 className="font-semibold">All Users</h2>
            <p className="text-sm text-gray-500">A list of all registered users in the system</p>
            <UsersTable />
          </div>
        )}

        {/* Active */}
        {tab === "active" && (
          <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
            <h2 className="font-semibold">Active Users</h2>
            <p className="text-sm text-gray-500">Users who have been active in the last 30 days</p>
            <UsersTable filter="active" />
          </div>
        )}

        {/* Inactive */}
        {tab === "inactive" && (
          <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
            <h2 className="font-semibold">Inactive Users</h2>
            <p className="text-sm text-gray-500">Users who haven't been active in the last 30 days</p>
            <UsersTable filter="inactive" />
          </div>
        )}

        {/* Blocked */}
        {tab === "blocked" && (
          <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
            <h2 className="font-semibold">Blocked Users</h2>
            <p className="text-sm text-gray-500">Users who have been blocked from the system</p>
            <UsersTable filter="blocked" />
          </div>
        )}
      </div>
    </div>
  )
}
