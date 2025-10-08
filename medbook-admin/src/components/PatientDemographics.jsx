import {
  Bar,
  BarChart,
  ResponsiveContainer,
  XAxis,
  YAxis,
  Tooltip,
  CartesianGrid,
  Legend,
} from "recharts"

const data = [
  { age: "0-18", male: 145, female: 132 },
  { age: "19-30", male: 234, female: 267 },
  { age: "31-45", male: 312, female: 298 },
  { age: "46-60", male: 287, female: 301 },
  { age: "60+", male: 198, female: 223 },
]

export default function PatientDemographics() {
  return (
    <ResponsiveContainer width="100%" height={300}>
      <BarChart data={data}>
        <CartesianGrid strokeDasharray="3 3" className="stroke-muted" />
        <XAxis
          dataKey="age"
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
        <Bar
          dataKey="male"
          fill="hsl(var(--chart-1))"
          radius={[4, 4, 0, 0]}
          name="Male"
        />
        <Bar
          dataKey="female"
          fill="hsl(var(--chart-3))"
          radius={[4, 4, 0, 0]}
          name="Female"
        />
      </BarChart>
    </ResponsiveContainer>
  )
}
