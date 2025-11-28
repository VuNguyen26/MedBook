import { useState, useEffect } from "react";
import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
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

export default function AppointmentChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchAppointmentData = async () => {
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
              name: monthKey,
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
          return monthNames.indexOf(a.name) - monthNames.indexOf(b.name);
        });

        setData(chartData);
      } catch (error) {
        console.error("Error fetching appointment chart data:", error);
        toast.error("Failed to load appointment chart data");
        // Fallback to empty data
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchAppointmentData();
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
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="name"
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
        <Bar
          dataKey="completed"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          name="Completed"
        />
        <Bar
          dataKey="pending"
          fill="hsl(var(--chart-4))"
          radius={[4, 4, 0, 0]}
          name="Pending"
        />
        <Bar
          dataKey="cancelled"
          fill="hsl(var(--chart-5))"
          radius={[4, 4, 0, 0]}
          name="Cancelled"
        />
      </BarChart>
    </ResponsiveContainer>
  );
}
