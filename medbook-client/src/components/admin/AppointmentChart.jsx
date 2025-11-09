import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
} from "recharts"

const data = [
  { name: "Jan", completed: 186, cancelled: 12, pending: 24 },
  { name: "Feb", completed: 205, cancelled: 15, pending: 28 },
  { name: "Mar", completed: 237, cancelled: 10, pending: 32 },
  { name: "Apr", completed: 273, cancelled: 18, pending: 35 },
  { name: "May", completed: 289, cancelled: 14, pending: 30 },
  { name: "Jun", completed: 314, cancelled: 16, pending: 38 },
]

export default function AppointmentChart() {
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
  )
}