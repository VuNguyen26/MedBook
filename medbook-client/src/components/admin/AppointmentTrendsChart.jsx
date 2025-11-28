import { useState, useEffect } from "react";
import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts";
import appointmentApi from "@/api/appointmentApi";
import { toast } from "react-toastify";

const monthNames = [
  "Jan",
  "Feb",
  "Mar",
  "Apr",
  "May",
  "Jun",
  "Jul",
  "Aug",
  "Sep",
  "Oct",
  "Nov",
  "Dec",
];

export default function AppointmentTrendsChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentTrendsData = async () => {
      try {
        const response = await appointmentApi.getAll();
        const appointments = response.data || [];

        // Group appointments by month and status
        const monthlyData = {};

        appointments.forEach((appointment) => {
          const date =
            appointment.date ||
            appointment.appointmentDate ||
            appointment.createdAt;
          if (!date) return;

          const appointmentDate = new Date(date);
          const monthKey = monthNames[appointmentDate.getMonth()];
          const status = (appointment.status || "PENDING").toUpperCase();

          if (!monthlyData[monthKey]) {
            monthlyData[monthKey] = {
              month: monthKey,
              completed: 0,
              cancelled: 0,
              pending: 0,
            };
          }

          if (status === "COMPLETED") {
            monthlyData[monthKey].completed++;
          } else if (status === "CANCELLED") {
            monthlyData[monthKey].cancelled++;
          } else {
            monthlyData[monthKey].pending++;
          }
        });

        // Convert to array and sort by month order
        const chartData = Object.values(monthlyData).sort((a, b) => {
          return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
        });

        setData(chartData);
      } catch (error) {
        console.error("Error fetching appointment trends chart data:", error);
        toast.error("Failed to load appointment trends chart data");
        // Fallback to empty data
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentTrendsData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <LineChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
        <Line
          type="monotone"
          dataKey="completed"
          stroke="hsl(var(--chart-1))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--chart-1))", r: 4 }}
          name="Completed"
        />
        <Line
          type="monotone"
          dataKey="pending"
          stroke="hsl(var(--chart-4))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--chart-4))", r: 4 }}
          name="Pending"
        />
        <Line
          type="monotone"
          dataKey="cancelled"
          stroke="hsl(var(--chart-5))"
          strokeWidth={3}
          dot={{ fill: "hsl(var(--chart-5))", r: 4 }}
          name="Cancelled"
        />
      </LineChart>
    </ResponsiveContainer>
  );
}
