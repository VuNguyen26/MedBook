import { Badge } from "../components/ui/badge"
import { Avatar, AvatarFallback, AvatarImage } from "../components/ui/avatar"

const appointments = [
  {
    id: 1,
    patient: "John Smith",
    doctor: "Dr. Sarah Johnson",
    time: "09:00 AM",
    status: "completed",
    type: "Check-up",
  },
  {
    id: 2,
    patient: "Emma Wilson",
    doctor: "Dr. Michael Chen",
    time: "10:30 AM",
    status: "in-progress",
    type: "Consultation",
  },
  {
    id: 3,
    patient: "Robert Brown",
    doctor: "Dr. Emily Davis",
    time: "11:00 AM",
    status: "pending",
    type: "Follow-up",
  },
  {
    id: 4,
    patient: "Lisa Anderson",
    doctor: "Dr. James Wilson",
    time: "02:00 PM",
    status: "pending",
    type: "Surgery",
  },
  {
    id: 5,
    patient: "David Lee",
    doctor: "Dr. Sarah Johnson",
    time: "03:30 PM",
    status: "cancelled",
    type: "Check-up",
  },
]

const statusConfig = {
  completed: {
    label: "Completed",
    className: "bg-success/10 text-success hover:bg-success/20",
  },
  "in-progress": {
    label: "In Progress",
    className: "bg-info/10 text-info hover:bg-info/20",
  },
  pending: {
    label: "Pending",
    className: "bg-warning/10 text-warning hover:bg-warning/20",
  },
  cancelled: {
    label: "Cancelled",
    className: "bg-destructive/10 text-destructive hover:bg-destructive/20",
  },
}

export default function RecentAppointments() {
  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src="/generic-placeholder-graphic.png?height=40&width=40" />
            <AvatarFallback>
              {appointment.patient
                .split(" ")
                .map((n) => n[0])
                .join("")}
            </AvatarFallback>
          </Avatar>
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {appointment.patient}
              </p>
              <span className="text-xs text-muted-foreground">
                {appointment.time}
              </span>
            </div>
            <div className="flex items-center gap-2">
              <p className="text-xs text-muted-foreground">
                {appointment.doctor}
              </p>
              <span className="text-xs text-muted-foreground">•</span>
              <p className="text-xs text-muted-foreground">{appointment.type}</p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={statusConfig[appointment.status].className}
          >
            {statusConfig[appointment.status].label}
          </Badge>
        </div>
      ))}
    </div>
  )
}
