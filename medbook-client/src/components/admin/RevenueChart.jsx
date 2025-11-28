import { useState, useEffect } from "react";
import {
  Area,
  AreaChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts";
import paymentApi from "@/api/paymentApi";
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

export default function RevenueChart() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRevenueData = async () => {
      try {
        const response = await paymentApi.getAll();
        const payments = response.data || [];

        // Group completed payments by month
        const monthlyRevenue = {};

        payments.forEach((payment) => {
          // Only count completed payments for revenue
          if ((payment.status || "pending") !== "completed") return;

          const date = payment.createdAt || payment.date;
          if (!date) return;

          const paymentDate = new Date(date);
          const monthKey = monthNames[paymentDate.getMonth()];
          const amount = payment.amount || payment.totalAmount || 0;

          if (!monthlyRevenue[monthKey]) {
            monthlyRevenue[monthKey] = {
              month: monthKey,
              revenue: 0,
            };
          }

          monthlyRevenue[monthKey].revenue += amount;
        });

        // Convert to array and sort by month order
        const chartData = Object.values(monthlyRevenue).sort((a, b) => {
          return monthNames.indexOf(a.month) - monthNames.indexOf(b.month);
        });

        setData(chartData);
      } catch (error) {
        console.error("Error fetching revenue chart data:", error);
        toast.error("Failed to load revenue chart data");
        // Fallback to empty data
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRevenueData();
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
      <AreaChart data={data}>
        <defs>
          <linearGradient id="colorRevenue" x1="0" y1="0" x2="0" y2="1">
            <stop
              offset="5%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0.4}
            />
            <stop
              offset="95%"
              stopColor="hsl(var(--chart-1))"
              stopOpacity={0.05}
            />
          </linearGradient>
        </defs>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="month"
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
        />
        <YAxis
          className="text-xs"
          tick={{ fill: "hsl(var(--muted-foreground))" }}
          tickFormatter={(value) => `$${(value / 1000).toFixed(0)}k`}
        />
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
          formatter={(value) => [`$${value.toLocaleString()}`, "Revenue"]}
        />
        <Area
          type="monotone"
          dataKey="revenue"
          stroke="hsl(var(--chart-1))"
          strokeWidth={3}
          fillOpacity={1}
          fill="url(#colorRevenue)"
        />
      </AreaChart>
    </ResponsiveContainer>
  );
}
