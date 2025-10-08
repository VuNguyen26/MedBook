import { useState } from "react"
import { Download, Calendar } from "lucide-react"
import AppointmentTrendsChart from "../components/AppointmentTrendsChart"
import SpecialtyDistribution from "../components/SpecialtyDistribution"
import PatientDemographics from "../components/PatientDemographics"
import ReportsList from "../components/ReportsList"


export default function Reports() {
  const [tab, setTab] = useState("overview")

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">Reports & Analytics</h1>
          <p className="text-gray-500">Comprehensive insights and data analysis</p>
        </div>
        <div className="flex gap-3">
  {/* 🟡 Nút Date Range - giống Filter */}
  <button
    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
              text-yellow-700 bg-gradient-to-r from-yellow-100 to-amber-100 
              border border-yellow-300 rounded-lg shadow-sm 
              hover:from-yellow-150 hover:to-amber-200 hover:shadow-md 
              transition-all duration-300"
  >
    <Calendar className="h-4 w-4 text-yellow-600" />
    Date Range
  </button>

  {/* 🔵 Nút Export Report - giống Export */}
  <button
    className="flex items-center gap-2 px-4 py-2 text-sm font-semibold 
              text-white bg-gradient-to-r from-teal-500 to-cyan-500 
              rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600 
              hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
  >
    <Download className="h-4 w-4 text-white" />
    Export Report
  </button>
</div>

      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Total Appointments</p>
          <h2 className="text-2xl font-bold">1,847</h2>
          <p className="text-xs text-green-600">+15.2% vs last period</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Patient Satisfaction</p>
          <h2 className="text-2xl font-bold">94.8%</h2>
          <p className="text-xs text-green-600">+2.3% improvement</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Avg. Wait Time</p>
          <h2 className="text-2xl font-bold">18 min</h2>
          <p className="text-xs text-green-600">-5 min improvement</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Cancellation Rate</p>
          <h2 className="text-2xl font-bold">3.2%</h2>
          <p className="text-xs text-red-600">+0.5% vs last period</p>
        </div>
      </div>

      {/* Tabs */}
      <div>
        <div className="flex gap-4 border-b">
          {["overview", "appointments", "financial", "custom"].map((t) => (
            <button
              key={t}
              onClick={() => setTab(t)}
              className={`px-4 py-2 -mb-px border-b-2 ${
                tab === t ? "border-blue-600 text-blue-600" : "border-transparent text-gray-500"
              }`}
            >
              {t === "overview" && "Overview"}
              {t === "appointments" && "Appointments"}
              {t === "financial" && "Financial"}
              {t === "custom" && "Custom Reports"}
            </button>
          ))}
        </div>

        {/* Overview */}
        {tab === "overview" && (
          <div className="space-y-4 mt-4">
            <div className="grid gap-4 md:grid-cols-2">
              <div className="p-4 border rounded-lg bg-white shadow">
                <h2 className="font-semibold">Appointment Trends</h2>
                <p className="text-sm text-gray-500 mb-2">Monthly appointment statistics</p>
                <AppointmentTrendsChart />
              </div>
              <div className="p-4 border rounded-lg bg-white shadow">
                <h2 className="font-semibold">Specialty Distribution</h2>
                <p className="text-sm text-gray-500 mb-2">Appointments by specialty</p>
                <SpecialtyDistribution />
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold">Patient Demographics</h2>
              <p className="text-sm text-gray-500 mb-2">Age and gender distribution</p>
              <PatientDemographics />
            </div>
          </div>
        )}

        {/* Appointments */}
        {tab === "appointments" && (
          <div className="p-4 border rounded-lg bg-white shadow mt-4">
            <h2 className="font-semibold">Appointment Analytics</h2>
            <p className="text-sm text-gray-500 mb-4">Detailed appointment statistics</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">1,654</p>
                <p className="text-xs text-green-600">89.5% completion rate</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">134</p>
                <p className="text-xs text-gray-400">7.3% of total</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cancelled</p>
                <p className="text-2xl font-bold">59</p>
                <p className="text-xs text-red-600">3.2% cancellation</p>
              </div>
            </div>
            <div className="mt-6">
              <AppointmentTrendsChart />
            </div>
          </div>
        )}

        {/* Financial */}
        {tab === "financial" && (
          <div className="p-4 border rounded-lg bg-white shadow mt-4">
            <h2 className="font-semibold">Financial Summary</h2>
            <p className="text-sm text-gray-500 mb-4">Revenue and payment analytics</p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">$284,520</p>
                <p className="text-xs text-green-600">+23.1% growth</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Transaction</p>
                <p className="text-2xl font-bold">$154</p>
                <p className="text-xs text-gray-400">Per appointment</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Outstanding</p>
                <p className="text-2xl font-bold">$12,340</p>
                <p className="text-xs text-yellow-600">4.3% of revenue</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-semibold">Payment Methods Breakdown</h4>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Credit/Debit Card</span> <span>52%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Insurance</span> <span>35%</span>
              </div>
              <div className="flex justify-between text-sm">
                <span className="text-gray-500">Cash</span> <span>13%</span>
              </div>
            </div>
          </div>
        )}

        {/* Custom */}
        {tab === "custom" && (
          <div className="p-4 border rounded-lg bg-white shadow mt-4">
            <h2 className="font-semibold">Custom Reports</h2>
            <p className="text-sm text-gray-500 mb-4">Generate and download custom reports</p>
            <ReportsList />
          </div>
        )}
      </div>
    </div>
  )
}
