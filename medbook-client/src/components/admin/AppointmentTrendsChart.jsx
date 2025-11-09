import {
  Line,
  LineChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

const data = [
  { month: "Jan", completed: 186, cancelled: 12, pending: 24 },
  { month: "Feb", completed: 205, cancelled: 15, pending: 28 },
  { month: "Mar", completed: 237, cancelled: 10, pending: 32 },
  { month: "Apr", completed: 273, cancelled: 18, pending: 35 },
  { month: "May", completed: 289, cancelled: 14, pending: 30 },
  { month: "Jun", completed: 314, cancelled: 16, pending: 38 },
]

export default function AppointmentTrendsChart() {
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
  )
}