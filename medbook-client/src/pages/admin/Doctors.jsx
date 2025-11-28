import { useState, useEffect } from "react";
import DoctorsTable from "../../components/admin/DoctorsTable";
import { Plus, Download } from "lucide-react";
import doctorApi from "@/api/doctorApi";
import { toast } from "react-toastify";

export default function Doctors() {
  const [tab, setTab] = useState("all");
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch doctors data for stats
  useEffect(() => {
    const fetchDoctorsStats = async () => {
      try {
        setLoading(true);
        const response = await doctorApi.getAll();
        setDoctors(response.data || []);
      } catch (err) {
        console.error("Error fetching doctors stats:", err);
        setError(err.message || "Failed to fetch doctors stats");
        toast.error("Failed to load doctors statistics");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorsStats();
  }, []);

  // Calculate stats from real data
  const totalDoctors = doctors.length;
  const availableDoctors = doctors.filter(
    (doctor) => (doctor.status || "available") === "available"
  ).length;
  const busyDoctors = doctors.filter(
    (doctor) => (doctor.status || "available") === "busy"
  ).length;
  const leaveDoctors = doctors.filter(
    (doctor) => (doctor.status || "available") === "leave"
  ).length;
  const availabilityRate =
    totalDoctors > 0 ? ((availableDoctors / totalDoctors) * 100).toFixed(1) : 0;

  // Calculate average rating
  const ratings = doctors
    .map((doctor) => doctor.rating || doctor.averageRating || 0)
    .filter((rating) => rating > 0);
  const avgRating =
    ratings.length > 0
      ? (
          ratings.reduce((sum, rating) => sum + rating, 0) / ratings.length
        ).toFixed(1)
      : 0;

  // Count unique specialties
  const specialties = [
    ...new Set(
      doctors
        .map((doctor) => doctor.specialty || doctor.specialization)
        .filter(Boolean)
    ),
  ];
  const specialtiesCount = specialties.length;

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
          {/*Nút Export - nền vàng nhạt, nhẹ nhàng */}
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

          {/*Nút Add Doctor - xanh gradient nổi bật */}
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
          <h2 className="text-2xl font-bold">
            {totalDoctors.toLocaleString()}
          </h2>
          <p className="text-xs text-gray-400">
            Across {specialtiesCount} specialties
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Available Today</p>
          <h2 className="text-2xl font-bold">
            {availableDoctors.toLocaleString()}
          </h2>
          <p className="text-xs text-green-600">
            {availabilityRate}% availability
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">Avg. Rating</p>
          <h2 className="text-2xl font-bold">{avgRating}</h2>
          <p className="text-xs text-gray-400">
            Based on {ratings.length} reviews
          </p>
        </div>
        <div className="p-4 border rounded-lg bg-white shadow">
          <p className="text-sm text-gray-500">On Leave/Busy</p>
          <h2 className="text-2xl font-bold">
            {(leaveDoctors + busyDoctors).toLocaleString()}
          </h2>
          <p className="text-xs text-red-600">
            {(
              ((leaveDoctors + busyDoctors) / Math.max(totalDoctors, 1)) *
              100
            ).toFixed(1)}
            % unavailable
          </p>
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
  );
}
