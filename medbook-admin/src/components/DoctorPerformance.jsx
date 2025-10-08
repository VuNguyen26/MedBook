import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import { Progress } from "@/components/ui/progress"

const doctors = [
  {
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    rating: 98,
    patients: 234,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    rating: 96,
    patients: 198,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Dr. Emily Davis",
    specialty: "Pediatrics",
    rating: 95,
    patients: 312,
    avatar: "/placeholder.svg?height=40&width=40",
  },
  {
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    rating: 94,
    patients: 187,
    avatar: "/placeholder.svg?height=40&width=40",
  },
]

export default function DoctorPerformance() {
  return (
    <div className="space-y-6">
      {doctors.map((doctor) => (
        <div key={doctor.name} className="space-y-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={doctor.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {doctor.name
                  .split(" ")
                  .map((n) => n[0])
                  .join("")}
              </AvatarFallback>
            </Avatar>
            <div className="flex-1 space-y-1">
              <div className="flex items-center justify-between">
                <p className="text-sm font-medium leading-none">
                  {doctor.name}
                </p>
                <span className="text-sm font-semibold text-primary">
                  {doctor.rating}%
                </span>
              </div>
              <p className="text-xs text-muted-foreground">
                {doctor.specialty} • {doctor.patients} patients
              </p>
            </div>
          </div>
          <Progress value={doctor.rating} className="h-2" />
        </div>
      ))}
    </div>
  )
}
