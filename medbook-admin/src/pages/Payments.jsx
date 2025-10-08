import { useState } from "react"
import PaymentsTable from "../components/PaymentsTable"
import RevenueChart from "../components/RevenueChart"
import { Download, Filter } from "lucide-react"

export default function Payments() {
  const [tab, setTab] = useState("all")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Payments Management
          </h1>
          <p className="text-gray-500">
            Track and manage all payment transactions
          </p>
        </div>
        <div className="flex gap-3">
            {/* 🟡 Nút Filter - nền vàng nhạt, ấm áp */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                        text-yellow-700 bg-gradient-to-r from-yellow-100 to-amber-100 
                        border border-yellow-300 rounded-lg shadow-sm 
                        hover:from-yellow-150 hover:to-amber-200 hover:shadow-md 
                        transition-all duration-300"
            >
              <Filter className="h-4 w-4 text-yellow-600" />
              Filter
            </button>

            {/* 🔵 Nút Export - nền xanh gradient, nổi bật */}
            <button
              className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
                        text-white bg-gradient-to-r from-teal-500 to-cyan-500 
                        rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 
                        hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
            >
              <Download className="h-4 w-4 text-white" />
              Export
            </button>
        </div>

      </div>

      {/* Stats Cards */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Total Revenue</p>
          <h2 className="text-2xl font-bold">$45,231</h2>
          <p className="text-xs text-green-600">+23.1% from last month</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Pending Payments</p>
          <h2 className="text-2xl font-bold">$8,420</h2>
          <p className="text-xs text-gray-400">32 transactions</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Completed Today</p>
          <h2 className="text-2xl font-bold">$3,240</h2>
          <p className="text-xs text-gray-400">87 transactions</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Failed Payments</p>
          <h2 className="text-2xl font-bold">$1,120</h2>
          <p className="text-xs text-red-600">5 transactions</p>
        </div>
      </div>

      {/* Revenue Chart */}
      <div className="p-4 border rounded-lg bg-white shadow">
        <h2 className="font-semibold mb-2">Revenue Overview</h2>
        <RevenueChart />
      </div>

      {/* Payments Table with Tabs */}
      <div>
        <div className="flex gap-4 border-b">
          {["all", "completed", "pending", "failed"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 -mb-px border-b-2 ${
                tab === t
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
              }`}
            >
              {t === "all" && "All Payments"}
              {t === "completed" && "Completed"}
              {t === "pending" && "Pending"}
              {t === "failed" && "Failed"}
            </button>
          ))}
        </div>

        <div className="mt-4">
          {tab === "all" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">All Transactions</h2>
              <PaymentsTable />
            </div>
          )}
          {tab === "completed" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">Completed Payments</h2>
              <PaymentsTable filter="completed" />
            </div>
          )}
          {tab === "pending" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">Pending Payments</h2>
              <PaymentsTable filter="pending" />
            </div>
          )}
          {tab === "failed" && (
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold mb-2">Failed Payments</h2>
              <PaymentsTable filter="failed" />
            </div>
          )}
        </div>
      </div>
    </div>
  )
}
