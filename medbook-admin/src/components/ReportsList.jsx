import { Button } from "@/components/ui/button"
import { FileText, Download, Calendar } from "lucide-react"
import { Badge } from "@/components/ui/badge"

const reports = [
  {
    id: 1,
    name: "Monthly Appointment Report",
    description: "Comprehensive appointment statistics for the month",
    date: "2024-03-01",
    type: "Appointments",
    status: "ready",
  },
  {
    id: 2,
    name: "Financial Summary Q1 2024",
    description: "Quarterly financial performance and revenue analysis",
    date: "2024-03-31",
    type: "Financial",
    status: "ready",
  },
  {
    id: 3,
    name: "Doctor Performance Review",
    description: "Individual doctor statistics and patient feedback",
    date: "2024-03-15",
    type: "Performance",
    status: "ready",
  },
  {
    id: 4,
    name: "Patient Satisfaction Survey",
    description: "Analysis of patient feedback and satisfaction scores",
    date: "2024-03-20",
    type: "Survey",
    status: "processing",
  },
]

const statusConfig = {
  ready: {
    label: "Ready",
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  processing: {
    label: "Processing",
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
}

export default function ReportsList() {
  return (
    <div className="space-y-4">
      {reports.map((report) => (
        <div
          key={report.id}
          className="flex items-center justify-between rounded-lg border border-border p-4"
        >
          <div className="flex items-start gap-4">
            <div className="rounded-lg bg-primary/10 p-3">
              <FileText className="h-5 w-5 text-primary" />
            </div>
            <div className="space-y-1">
              <div className="flex items-center gap-2">
                <h4 className="font-semibold">{report.name}</h4>
                <Badge variant="outline" className="text-xs">
                  {report.type}
                </Badge>
              </div>
              <p className="text-sm text-muted-foreground">
                {report.description}
              </p>
              <div className="flex items-center gap-2 text-xs text-muted-foreground">
                <Calendar className="h-3 w-3" />
                {report.date}
              </div>
            </div>
          </div>
          <div className="flex items-center gap-2">
            <Badge
              variant="secondary"
              className={statusConfig[report.status].className}
            >
              {statusConfig[report.status].label}
            </Badge>
            {report.status === "ready" && (
              <Button size="sm" variant="outline">
                <Download className="mr-2 h-4 w-4" />
                Download
              </Button>
            )}
          </div>
        </div>
      ))}
    </div>
  )
}
