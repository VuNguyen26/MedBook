import {
  Cell,
  Pie,
  PieChart,
  ResponsiveContainer,
  Tooltip,
  Legend,
} from "recharts"

const data = [
  { name: "Cardiology", value: 234, color: "hsl(var(--chart-1))" },
  { name: "Neurology", value: 198, color: "hsl(var(--chart-2))" },
  { name: "Pediatrics", value: 312, color: "hsl(var(--chart-3))" },
  { name: "Orthopedics", value: 187, color: "hsl(var(--chart-4))" },
  { name: "Dermatology", value: 156, color: "hsl(var(--chart-5))" },
]

export default function SpecialtyDistribution() {
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
  )
}