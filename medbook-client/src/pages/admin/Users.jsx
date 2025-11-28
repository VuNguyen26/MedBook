import { useState, useEffect } from "react";
import UsersTable from "../../components/admin/UsersTable";
import { Plus, Download } from "lucide-react";
import userApi from "@/api/userApi";
import { toast } from "react-toastify";

export default function Users() {
  const [tab, setTab] = useState("all");
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch users data for stats
  useEffect(() => {
    const fetchUsersStats = async () => {
      try {
        setLoading(true);
        const response = await userApi.getAll();
        setUsers(response.data || []);
      } catch (err) {
        console.error("Error fetching users stats:", err);
        setError(err.message || "Failed to fetch users stats");
        toast.error("Failed to load users statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchUsersStats();
  }, []);

  // Calculate stats from real data
  const totalUsers = users.length;
  const activeUsers = users.filter(
    (user) => (user.status || "active") === "active"
  ).length;
  const inactiveUsers = users.filter(
    (user) => (user.status || "active") === "inactive"
  ).length;
  const blockedUsers = users.filter(
    (user) => (user.status || "active") === "blocked"
  ).length;
  const activeRate =
    totalUsers > 0 ? ((activeUsers / totalUsers) * 100).toFixed(1) : 0;

  // Calculate new users this month (assuming createdAt field)
  const currentMonth = new Date().getMonth();
  const currentYear = new Date().getFullYear();
  const newThisMonth = users.filter((user) => {
    if (!user.createdAt) return false;
    const createdDate = new Date(user.createdAt);
    return (
      createdDate.getMonth() === currentMonth &&
      createdDate.getFullYear() === currentYear
    );
  }).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div className="flex items-center justify-between">
        <div>
          <h1 className="text-3xl font-bold tracking-tight text-gray-900">
            Users Management
          </h1>
          <p className="text-gray-500">
            Manage patient accounts and information
          </p>
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
          <h2 className="text-2xl font-bold">{totalUsers.toLocaleString()}</h2>
          <p className="text-xs text-gray-500">Registered users</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Active Users</p>
          <h2 className="text-2xl font-bold">{activeUsers.toLocaleString()}</h2>
          <p className="text-xs text-green-600">{activeRate}% active rate</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">New This Month</p>
          <h2 className="text-2xl font-bold">
            {newThisMonth.toLocaleString()}
          </h2>
          <p className="text-xs text-gray-500">Recent registrations</p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Inactive/Blocked</p>
          <h2 className="text-2xl font-bold">
            {(inactiveUsers + blockedUsers).toLocaleString()}
          </h2>
          <p className="text-xs text-red-600">
            {(
              ((inactiveUsers + blockedUsers) / Math.max(totalUsers, 1)) *
              100
            ).toFixed(1)}
            % inactive
          </p>
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
                tab === t
                  ? "border-blue-600 text-blue-600"
                  : "border-transparent text-gray-500"
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
            <p className="text-sm text-gray-500">
              A list of all registered users in the system
            </p>
            <UsersTable />
          </div>
        )}

        {/* Active */}
        {tab === "active" && (
          <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
            <h2 className="font-semibold">Active Users</h2>
            <p className="text-sm text-gray-500">
              Users who have been active in the last 30 days
            </p>
            <UsersTable filter="active" />
          </div>
        )}

        {/* Inactive */}
        {tab === "inactive" && (
          <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
            <h2 className="font-semibold">Inactive Users</h2>
            <p className="text-sm text-gray-500">
              Users who haven't been active in the last 30 days
            </p>
            <UsersTable filter="inactive" />
          </div>
        )}

        {/* Blocked */}
        {tab === "blocked" && (
          <div className="mt-4 p-4 border rounded-lg bg-white shadow space-y-2">
            <h2 className="font-semibold">Blocked Users</h2>
            <p className="text-sm text-gray-500">
              Users who have been blocked from the system
            </p>
            <UsersTable filter="blocked" />
          </div>
        )}
      </div>
    </div>
  );
}
