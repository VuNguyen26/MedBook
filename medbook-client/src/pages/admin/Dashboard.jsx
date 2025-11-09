import { Users, Calendar, DollarSign, Activity, Clock } from "lucide-react";
import StatsCard from "@/components/admin/StatsCard";
import RecentAppointments from "@/components/admin/recent-appointments";
import AppointmentChart from "@/components/admin/AppointmentChart";
import DoctorPerformance from "@/components/admin/DoctorPerformance";
import {
  Card,
  CardContent,
  CardHeader,
  CardTitle,
} from "@/components/ui/card";


export default function Dashboard() {
  return (
    <div className="space-y-6">
      {/* Page Header */}
      <div>
        <h1 className="text-3xl font-bold tracking-tight text-gray-900">Dashboard</h1>
        <p className="text-gray-500">
          Welcome back! Here's what's happening today.
        </p>
      </div>

      {/* Stats Grid */}
      <div className="grid gap-4 md:grid-cols-2 lg:grid-cols-4">
        <StatsCard
          title="Total Patients"
          value="2,847"
          change="+12.5%"
          trend="up"
          icon={Users}
          description="vs last month"
        />
        <StatsCard
          title="Appointments Today"
          value="124"
          change="+8.2%"
          trend="up"
          icon={Calendar}
          description="32 pending"
        />
        <StatsCard
          title="Revenue"
          value="$45,231"
          change="+23.1%"
          trend="up"
          icon={DollarSign}
          description="vs last month"
        />
        <StatsCard
          title="Active Doctors"
          value="48"
          change="-2.4%"
          trend="down"
          icon={Activity}
          description="2 on leave"
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
              <span className="text-sm font-semibold">87</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">New Patients</span>
              </div>
              <span className="text-sm font-semibold">23</span>
            </div>
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-2">
                <Activity className="h-4 w-4 text-gray-400" />
                <span className="text-sm text-gray-500">Cancellations</span>
              </div>
              <span className="text-sm font-semibold text-red-500">5</span>
            </div>
          </CardContent>
        </Card>
      </div>
    </div>
  )
}
