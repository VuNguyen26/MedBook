import { Users, Calendar, DollarSign, Activity, Clock } from "lucide-react";
import { useState, useEffect } from "react";
import StatsCard from "@/components/admin/StatsCard";
import RecentAppointments from "@/components/admin/recent-appointments";
import AppointmentChart from "@/components/admin/AppointmentChart";
import DoctorPerformance from "@/components/admin/DoctorPerformance";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import userApi from "@/api/userApi";
import doctorApi from "@/api/doctorApi";
import paymentApi from "@/api/paymentApi";
import appointmentApi from "@/api/appointmentApi";
import { toast } from "react-toastify";

export default function Dashboard() {
  const [dashboardData, setDashboardData] = useState({
    users: [],
    doctors: [],
    payments: [],
    appointments: [],
  });
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  // Fetch all dashboard data
  useEffect(() => {
    const fetchDashboardData = async () => {
      try {
        setLoading(true);
        const [usersRes, doctorsRes, paymentsRes, appointmentsRes] =
          await Promise.allSettled([
            userApi.getAll(),
            doctorApi.getAll(),
            paymentApi.getAll(),
            appointmentApi.getAll(),
          ]);

        setDashboardData({
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
          toast.error("Failed to load users data");
        if (doctorsRes.status === "rejected")
          toast.error("Failed to load doctors data");
        if (paymentsRes.status === "rejected")
          toast.error("Failed to load payments data");
        if (appointmentsRes.status === "rejected")
          toast.error("Failed to load appointments data");
      } catch (err) {
        console.error("Error fetching dashboard data:", err);
        setError(err.message || "Failed to fetch dashboard data");
        toast.error("Failed to load dashboard data");
      } finally {
        setLoading(false);
      }
    };

    fetchDashboardData();
  }, []);

  // Calculate stats from real data
  const totalPatients = dashboardData.users.length;
  const activeDoctors = dashboardData.doctors.filter(
    (doctor) => (doctor.status || "available") === "available"
  ).length;
  const totalRevenue = dashboardData.payments
    .filter((payment) => (payment.status || "pending") === "completed")
    .reduce(
      (sum, payment) => sum + (payment.amount || payment.totalAmount || 0),
      0
    );

  // Today's appointments
  const today = new Date().toDateString();
  const todayAppointments = dashboardData.appointments.filter((appointment) => {
    if (!appointment.date && !appointment.appointmentDate) return false;
    const appointmentDate = new Date(
      appointment.date || appointment.appointmentDate
    ).toDateString();
    return appointmentDate === today;
  });
  const pendingAppointments = todayAppointments.filter((app) => {
    const status = (app.status || "PENDING").toUpperCase();
    // Xem CONFIRMED cũng là dạng \"chờ\" trong thống kê
    return status === "PENDING" || status === "CONFIRMED";
  }).length;

  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">
          Dashboard
        </h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value={totalPatients.toLocaleString()}
          change="+12.5%"
          trend="up"
          icon={Users}
          description="Registered users"
        />
        <StatsCard
          title="Appointments Today"
          value={todayAppointments.length.toString()}
          change="+8.2%"
          trend="up"
          icon={Calendar}
          description={`${pendingAppointments} pending`}
        />
        <StatsCard
          title="Revenue"
          value={`$${totalRevenue.toLocaleString()}`}
          change="+23.1%"
          trend="up"
          icon={DollarSign}
          description="Total earnings"
        />
        <StatsCard
          title="Active Doctors"
          value={activeDoctors.toString()}
          change="-2.4%"
          trend="down"
          icon={Activity}
          description={`${
            dashboardData.doctors.length - activeDoctors
          } unavailable`}
        />
      </div>

      {/* Charts Row */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Appointment Overview</CardTitle>
            <p className="text-sm text-gray-500">
              Monthly appointment statistics
            </p>
          </CardHeader>
          <CardContent>
            <AppointmentChart />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Top Performing Doctors</CardTitle>
            <p className="text-sm text-gray-500">
              Based on patient satisfaction
            </p>
          </CardHeader>
          <CardContent>
            <DoctorPerformance />
          </CardContent>
        </Card>
      </div>

      {/* Recent Activity */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-7">
        <Card className="col-span-4">
          <CardHeader>
            <CardTitle>Recent Appointments</CardTitle>
            <p className="text-sm text-gray-500">
              Latest scheduled appointments
            </p>
          </CardHeader>
          <CardContent>
            <RecentAppointments />
          </CardContent>
        </Card>

        <Card className="col-span-3">
          <CardHeader>
            <CardTitle>Quick Stats</CardTitle>
            <p className="text-sm text-gray-500">Today's overview</p>
          </CardHeader>
          <CardContent className="space-y-4">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Clock className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Avg. Wait Time</span>
              </div>
              <span className="text-sm font-semibold">18 mins</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Completed Today</span>
              </div>
              <span className="text-sm font-semibold">
                {
                  todayAppointments.filter((app) => {
                    const status = (app.status || "PENDING").toUpperCase();
                    return status === "COMPLETED";
                  }).length
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">New Patients</span>
              </div>
              <span className="text-sm font-semibold">
                {
                  dashboardData.users.filter((user) => {
                    if (!user.createdAt) return false;
                    const createdDate = new Date(user.createdAt);
                    const today = new Date();
                    return createdDate.toDateString() === today.toDateString();
                  }).length
                }
              </span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Cancellations</span>
              </div>
              <span className="text-sm font-semibold text-red-500">
                {
                  dashboardData.appointments.filter((app) => {
                    const status = (app.status || "PENDING").toUpperCase();
                    return status === "CANCELLED";
                  }).length
                }
              </span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
