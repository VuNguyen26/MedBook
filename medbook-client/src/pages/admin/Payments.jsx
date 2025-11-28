import { useState, useEffect } from "react";
import PaymentsTable from "../../components/admin/PaymentsTable";
import RevenueChart from "../../components/admin/RevenueChart";
import { Download, Filter } from "lucide-react";
import paymentApi from "@/api/paymentApi";
import { toast } from "react-toastify";

export default function Payments() {
  const [tab, setTab] = useState("all");
  const [payments, setPayments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch payments data for stats
  useEffect(() => {
    const fetchPaymentsStats = async () => {
      try {
        setLoading(true);
        const response = await paymentApi.getAll();
        setPayments(response.data || []);
      } catch (err) {
        console.error("Error fetching payments stats:", err);
        setError(err.message || "Failed to fetch payments stats");
        toast.error("Failed to load payments statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchPaymentsStats();
  }, []);

  // Calculate stats from real data
  const totalRevenue = payments
    .filter((payment) => (payment.status || "pending") === "completed")
    .reduce(
      (sum, payment) => sum + (payment.amount || payment.totalAmount || 0),
      0
    );

  const pendingPayments = payments.filter(
    (payment) => (payment.status || "pending") === "pending"
  );
  const pendingAmount = pendingPayments.reduce(
    (sum, payment) => sum + (payment.amount || payment.totalAmount || 0),
    0
  );
  const pendingCount = pendingPayments.length;

  const completedPayments = payments.filter(
    (payment) => (payment.status || "pending") === "completed"
  );
  const completedAmount = completedPayments.reduce(
    (sum, payment) => sum + (payment.amount || payment.totalAmount || 0),
    0
  );
  const completedCount = completedPayments.length;

  const failedPayments = payments.filter(
    (payment) => (payment.status || "pending") === "failed"
  );
  const failedAmount = failedPayments.reduce(
    (sum, payment) => sum + (payment.amount || payment.totalAmount || 0),
    0
  );
  const failedCount = failedPayments.length;

  // Calculate today's completed payments
  const today = new Date().toDateString();
  const completedToday = completedPayments.filter((payment) => {
    if (!payment.createdAt && !payment.date) return false;
    const paymentDate = new Date(
      payment.createdAt || payment.date
    ).toDateString();
    return paymentDate === today;
  });
  const completedTodayAmount = completedToday.reduce(
    (sum, payment) => sum + (payment.amount || payment.totalAmount || 0),
    0
  );
  const completedTodayCount = completedToday.length;

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
          {/* Nút Filter */}
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

          {/* Nút Export */}
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
          <h2 className="text-2xl font-bold">
            ${totalRevenue.toLocaleString()}
          </h2>
          <p className="text-xs text-green-600">
            From {completedCount} transactions
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Pending Payments</p>
          <h2 className="text-2xl font-bold">
            ${pendingAmount.toLocaleString()}
          </h2>
          <p className="text-xs text-gray-400">{pendingCount} transactions</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Completed Today</p>
          <h2 className="text-2xl font-bold">
            ${completedTodayAmount.toLocaleString()}
          </h2>
          <p className="text-xs text-gray-400">
            {completedTodayCount} transactions
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Failed Payments</p>
          <h2 className="text-2xl font-bold">
            ${failedAmount.toLocaleString()}
          </h2>
          <p className="text-xs text-red-600">{failedCount} transactions</p>
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
  );
}
