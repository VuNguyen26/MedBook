import { useState, useEffect } from "react";
import { Download, Calendar } from "lucide-react";

import AppointmentTrendsChart from "@/components/admin/AppointmentTrendsChart";
import SpecialtyDistribution from "@/components/admin/SpecialtyDistribution";
import PatientDemographics from "@/components/admin/PatientDemographics";
import ReportsList from "@/components/admin/ReportsList";
import userApi from "@/api/userApi";
import doctorApi from "@/api/doctorApi";
import paymentApi from "@/api/paymentApi";
import appointmentApi from "@/api/appointmentApi";
import axiosClient from "@/api/axios";
import { toast } from "react-toastify";

export default function Reports() {
  const [tab, setTab] = useState("overview");
  const [reportsData, setReportsData] = useState({
    users: [],
    doctors: [],
    payments: [],
    appointments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  const [fromDate, setFromDate] = useState("");
  const [toDate, setToDate] = useState("");
  const [selectedDoctorId, setSelectedDoctorId] = useState("");

  // Fetch all reports data
  useEffect(() => {
    const fetchReportsData = async () => {
      try {
        setLoading(true);
        const [usersRes, doctorsRes, paymentsRes, appointmentsRes] =
          await Promise.allSettled([
            userApi.getAll(),
            doctorApi.getAll(),
            paymentApi.getAll(),
            appointmentApi.getAll(),
          ]);

        setReportsData({
          users:
            usersRes.status === "fulfilled" ? usersRes.value.data || [] : [],
          doctors:
            doctorsRes.status === "fulfilled"
              ? doctorsRes.value.data || []
              : [],
          payments:
            paymentsRes.status === "fulfilled"
              ? paymentsRes.value.data || []
              : [],
          appointments:
            appointmentsRes.status === "fulfilled"
              ? appointmentsRes.value.data || []
              : [],
        });

        // Show error for failed requests
        if (usersRes.status === "rejected")
          toast.error("Failed to load users data for reports");
        if (doctorsRes.status === "rejected")
          toast.error("Failed to load doctors data for reports");
        if (paymentsRes.status === "rejected")
          toast.error("Failed to load payments data for reports");
        if (appointmentsRes.status === "rejected")
          toast.error("Failed to load appointments data for reports");
      } catch (err) {
        console.error("Error fetching reports data:", err);
        setError(err.message || "Failed to fetch reports data");
        toast.error("Failed to load reports data");
      } finally {
        setLoading(false);
      }
    };

    fetchReportsData();
  }, []);

  const handleExportPdf = async () => {
    try {
      const params = {};
      if (fromDate) params.fromDate = fromDate;
      if (toDate) params.toDate = toDate;
      if (selectedDoctorId) params.doctorId = selectedDoctorId;

      const response = await axiosClient.get("/api/appointments/reports/pdf", {
        params,
        responseType: "blob",
      });

      const blob = new Blob([response.data], { type: "application/pdf" });
      const url = window.URL.createObjectURL(blob);
      window.open(url, "_blank");
    } catch (error) {
      console.error("Error exporting PDF report:", error);
      toast.error("Không thể xuất báo cáo PDF. Vui lòng thử lại.");
    }
  };

  // Calculate reports stats from real data
  const totalAppointments = reportsData.appointments.length;
  const completedAppointments = reportsData.appointments.filter(
    (app) => (app.status || "pending") === "completed"
  ).length;
  const cancelledAppointments = reportsData.appointments.filter(
    (app) => (app.status || "pending") === "cancelled"
  ).length;
  const pendingAppointments = reportsData.appointments.filter(
    (app) => (app.status || "pending") === "pending"
  ).length;

  const cancellationRate =
    totalAppointments > 0
      ? ((cancelledAppointments / totalAppointments) * 100).toFixed(1)
      : 0;

  // Calculate patient satisfaction (assuming doctors have ratings)
  const doctorRatings = reportsData.doctors
    .map((doctor) => doctor.rating || doctor.averageRating || 0)
    .filter((rating) => rating > 0);
  const avgSatisfaction =
    doctorRatings.length > 0
      ? (
          (doctorRatings.reduce((sum, rating) => sum + rating, 0) /
            doctorRatings.length) *
          20
        ).toFixed(1)
      : 0;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Reports & Analytics
          </h1>
          <p className="text-gray-500">
            Comprehensive insights and data analysis
          </p>
        </div>
        <div className="flex flex-col md:flex-row gap-3 items-stretch md:items-center">
          <div className="flex items-center gap-2">
            <Calendar className="h-4 w-4 text-yellow-600" />
            <span className="text-sm font-semibold text-gray-600">
              Date Range
            </span>
          </div>
          <div className="flex flex-col sm:flex-row gap-2">
            <input
              type="date"
              value={fromDate}
              onChange={(e) => setFromDate(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            />
            <span className="self-center text-gray-400 text-xs sm:text-sm">
              to
            </span>
            <input
              type="date"
              value={toDate}
              onChange={(e) => setToDate(e.target.value)}
              className="border rounded-md px-3 py-1 text-sm"
            />
          </div>
          <select
            value={selectedDoctorId}
            onChange={(e) => setSelectedDoctorId(e.target.value)}
            className="border rounded-md px-3 py-1 text-sm min-w-[160px]"
          >
            <option value="">All doctors</option>
            {reportsData.doctors.map((doctor) => (
              <option key={doctor.id} value={doctor.id}>
                {doctor.fullName || doctor.name || `Doctor #${doctor.id}`}
              </option>
            ))}
          </select>
          <button
            onClick={handleExportPdf}
            className="flex items-center justify-center gap-2 px-4 py-2 text-sm font-semibold
              text-white bg-gradient-to-r from-teal-500 to-cyan-500
              rounded-lg shadow-md hover:from-teal-600 hover:to-cyan-600
              hover:shadow-lg hover:scale-[1.03] transition-all duration-300"
          >
            <Download className="h-4 w-4 text-white" />
            Export PDF
          </button>
        </div>
      </div>

      {/* Quick Stats */}
      <div className="grid gap-4 md:grid-cols-4">
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Total Appointments</p>
          <h2 className="text-2xl font-bold">
            {totalAppointments.toLocaleString()}
          </h2>
          <p className="text-xs text-green-600">Total scheduled</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Patient Satisfaction</p>
          <h2 className="text-2xl font-bold">{avgSatisfaction}%</h2>
          <p className="text-xs text-green-600">Based on doctor ratings</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Avg. Wait Time</p>
          <h2 className="text-2xl font-bold">18 min</h2>
          <p className="text-xs text-green-600">Standard wait time</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Cancellation Rate</p>
          <h2 className="text-2xl font-bold">{cancellationRate}%</h2>
          <p className="text-xs text-red-600">
            {cancelledAppointments} cancellations
          </p>
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
                tab === t
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
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
                <p className="text-sm text-gray-500 mb-2">
                  Monthly appointment statistics
                </p>
                <AppointmentTrendsChart />
              </div>
              <div className="p-4 border rounded-lg bg-white shadow">
                <h2 className="font-semibold">Specialty Distribution</h2>
                <p className="text-sm text-gray-500 mb-2">
                  Appointments by specialty
                </p>
                <SpecialtyDistribution />
              </div>
            </div>
            <div className="p-4 border rounded-lg bg-white shadow">
              <h2 className="font-semibold">Patient Demographics</h2>
              <p className="text-sm text-gray-500 mb-2">
                Age and gender distribution
              </p>
              <PatientDemographics />
            </div>
          </div>
        )}

        {/* Appointments */}
        {tab === "appointments" && (
          <div className="p-4 border rounded-lg bg-white shadow mt-4">
            <h2 className="font-semibold">Appointment Analytics</h2>
            <p className="text-sm text-gray-500 mb-4">
              Detailed appointment statistics
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Completed</p>
                <p className="text-2xl font-bold">
                  {completedAppointments.toLocaleString()}
                </p>
                <p className="text-xs text-green-600">
                  {totalAppointments > 0
                    ? (
                        (completedAppointments / totalAppointments) *
                        100
                      ).toFixed(1)
                    : 0}
                  % completion rate
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Pending</p>
                <p className="text-2xl font-bold">
                  {pendingAppointments.toLocaleString()}
                </p>
                <p className="text-xs text-gray-400">
                  {totalAppointments > 0
                    ? ((pendingAppointments / totalAppointments) * 100).toFixed(
                        1
                      )
                    : 0}
                  % of total
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Cancelled</p>
                <p className="text-2xl font-bold">
                  {cancelledAppointments.toLocaleString()}
                </p>
                <p className="text-xs text-red-600">
                  {cancellationRate}% cancellation
                </p>
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
            <p className="text-sm text-gray-500 mb-4">
              Revenue and payment analytics
            </p>
            <div className="grid gap-4 md:grid-cols-3">
              <div>
                <p className="text-sm text-gray-500">Total Revenue</p>
                <p className="text-2xl font-bold">
                  $
                  {reportsData.payments
                    .filter(
                      (payment) => (payment.status || "pending") === "completed"
                    )
                    .reduce(
                      (sum, payment) =>
                        sum + (payment.amount || payment.totalAmount || 0),
                      0
                    )
                    .toLocaleString()}
                </p>
                <p className="text-xs text-green-600">
                  From completed payments
                </p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Avg. Transaction</p>
                <p className="text-2xl font-bold">
                  $
                  {completedAppointments > 0
                    ? (
                        reportsData.payments
                          .filter(
                            (payment) =>
                              (payment.status || "pending") === "completed"
                          )
                          .reduce(
                            (sum, payment) =>
                              sum +
                              (payment.amount || payment.totalAmount || 0),
                            0
                          ) / completedAppointments
                      ).toFixed(0)
                    : 0}
                </p>
                <p className="text-xs text-gray-400">Per appointment</p>
              </div>
              <div>
                <p className="text-sm text-gray-500">Outstanding</p>
                <p className="text-2xl font-bold">
                  $
                  {reportsData.payments
                    .filter(
                      (payment) => (payment.status || "pending") === "pending"
                    )
                    .reduce(
                      (sum, payment) =>
                        sum + (payment.amount || payment.totalAmount || 0),
                      0
                    )
                    .toLocaleString()}
                </p>
                <p className="text-xs text-yellow-600">Pending payments</p>
              </div>
            </div>
            <div className="mt-6 space-y-2">
              <h4 className="text-sm font-semibold">
                Payment Methods Breakdown
              </h4>
              {(() => {
                const methodCounts = reportsData.payments.reduce(
                  (acc, payment) => {
                    const method =
                      payment.method || payment.paymentMethod || "Cash";
                    acc[method] = (acc[method] || 0) + 1;
                    return acc;
                  },
                  {}
                );

                const totalPayments = reportsData.payments.length;
                return Object.entries(methodCounts).map(([method, count]) => (
                  <div key={method} className="flex justify-between text-sm">
                    <span className="text-gray-500">{method}</span>
                    <span>
                      {totalPayments > 0
                        ? ((count / totalPayments) * 100).toFixed(0)
                        : 0}
                      %
                    </span>
                  </div>
                ));
              })()}
            </div>
          </div>
        )}

        {/* Custom */}
        {tab === "custom" && (
          <div className="p-4 border rounded-lg bg-white shadow mt-4">
            <h2 className="font-semibold">Custom Reports</h2>
            <p className="text-sm text-gray-500 mb-4">
              Generate and download custom reports
            </p>
            <ReportsList />
          </div>
        )}
      </div>
    </div>
  );
}
