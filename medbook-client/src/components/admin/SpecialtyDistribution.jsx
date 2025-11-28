import { useState, useEffect } from "react";
import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts";
import doctorApi from "@/api/doctorApi";
import { toast } from "react-toastify";

const colors = [
  "hsl(var(--chart-1))",
  "hsl(var(--chart-2))",
  "hsl(var(--chart-3))",
  "hsl(var(--chart-4))",
  "hsl(var(--chart-5))",
];

export default function SpecialtyDistribution() {
  const [data, setData] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchSpecialtyDistributionData = async () => {
      try {
        const response = await doctorApi.getAll();
        const doctors = response.data || [];

        // Group doctors by specialty
        const specialtyCount = {};

        doctors.forEach((doctor) => {
          const specialty =
            doctor.specialty || doctor.specialization || "General";
          specialtyCount[specialty] = (specialtyCount[specialty] || 0) + 1;
        });

        // Convert to chart data format
        const chartData = Object.entries(specialtyCount)
          .map(([name, value], index) => ({
            name,
            value,
            color: colors[index % colors.length],
          }))
          .sort((a, b) => b.value - a.value); // Sort by value descending

        setData(chartData);
      } catch (error) {
        console.error("Error fetching specialty distribution data:", error);
        toast.error("Failed to load specialty distribution data");
        // Fallback to empty data
        setData([]);
      } finally {
        setLoading(false);
      }
    };

    fetchSpecialtyDistributionData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (data.length === 0) {
    return (
      <div className="flex items-center justify-center h-[300px]">
        <p className="text-muted-foreground">No specialty data available</p>
      </div>
    );
  }

  return (
    <ResponsiveContainer width="100%" height={300}>
      <PieChart>
        <Pie
          data={data}
          cx="50%"
          cy="50%"
          labelLine={false}
          label={({ name, percent }) =>
            `${name} ${(percent * 100).toFixed(0)}%`
          }
          outerRadius={90}
          fill="#8884d8"
          dataKey="value"
          strokeWidth={2}
          stroke="hsl(var(--background))"
        >
          {data.map((entry, index) => (
            <Cell key={`cell-${index}`} fill={entry.color} />
          ))}
        </Pie>
        <Tooltip
          contentStyle={{
            backgroundColor: "hsl(var(--card))",
            border: "1px solid hsl(var(--border))",
            borderRadius: "8px",
          }}
        />
        <Legend />
      </PieChart>
    </ResponsiveContainer>
  );
}
