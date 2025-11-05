import { useState, useRef } from "react"
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table"
import { Badge } from "@/components/ui/badge"
import { Button } from "@/components/ui/button"
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar"
import {
  MoreHorizontal,
  Mail,
  Phone,
  Edit,
  Trash2,
  Calendar,
  Star,
} from "lucide-react"
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu"
import { Input } from "@/components/ui/input"
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select"

// ==================== Data ====================
const doctors = [
  {
    id: 1,
    name: "Dr. Sarah Johnson",
    specialty: "Cardiology",
    email: "sarah.johnson@hospital.com",
    phone: "+1 234 567 8900",
    status: "available",
    rating: 4.9,
    patients: 234,
    experience: "15 years",
  },
  {
    id: 2,
    name: "Dr. Michael Chen",
    specialty: "Neurology",
    email: "michael.chen@hospital.com",
    phone: "+1 234 567 8901",
    status: "busy",
    rating: 4.8,
    patients: 198,
    experience: "12 years",
  },
  {
    id: 3,
    name: "Dr. Emily Davis",
    specialty: "Pediatrics",
    email: "emily.davis@hospital.com",
    phone: "+1 234 567 8902",
    status: "available",
    rating: 4.9,
    patients: 312,
    experience: "10 years",
  },
  {
    id: 4,
    name: "Dr. James Wilson",
    specialty: "Orthopedics",
    email: "james.wilson@hospital.com",
    phone: "+1 234 567 8903",
    status: "available",
    rating: 4.7,
    patients: 187,
    experience: "18 years",
  },
  {
    id: 5,
    name: "Dr. Maria Garcia",
    specialty: "Dermatology",
    email: "maria.garcia@hospital.com",
    phone: "+1 234 567 8904",
    status: "leave",
    rating: 4.8,
    patients: 156,
    experience: "8 years",
  },
  {
    id: 6,
    name: "Dr. Robert Taylor",
    specialty: "General Surgery",
    email: "robert.taylor@hospital.com",
    phone: "+1 234 567 8905",
    status: "busy",
    rating: 4.9,
    patients: 203,
    experience: "20 years",
  },
]

const statusConfig = {
  available: {
    label: "Available",
    className: "bg-green-100 text-green-700 hover:bg-green-200",
  },
  busy: {
    label: "Busy",
    className: "bg-yellow-100 text-yellow-700 hover:bg-yellow-200",
  },
  leave: {
    label: "On Leave",
    className: "bg-red-100 text-red-700 hover:bg-red-200",
  },
}

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Surgery",
]

// ==================== Component ====================
export default function DoctorsTable({ filter }) {
  const [searchQuery, setSearchQuery] = useState("")
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties")

  const [openId, setOpenId] = useState(null)

  const [openSelect, setOpenSelect] = useState(false)
  const triggerRef = useRef(null)

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      doctor.name.toLowerCase().includes(searchQuery.toLowerCase()) ||
      doctor.specialty.toLowerCase().includes(searchQuery.toLowerCase())
    const matchesStatus = !filter || filter === "all" || doctor.status === filter
    const matchesSpecialty =
      specialtyFilter === "All Specialties" ||
      doctor.specialty === specialtyFilter
    return matchesSearch && matchesStatus && matchesSpecialty
  })

  return (
    <div className="space-y-4">
      {/* Search + Filter */}
      <div className="flex flex-wrap items-center gap-2">
        <Input
          placeholder="Search doctors by name or specialty..."
          value={searchQuery}
          onChange={(e) => setSearchQuery(e.target.value)}
          className="max-w-sm"
        />

        {/* Select Filter (có state openSelect) */}
        <Select value={specialtyFilter} onValueChange={setSpecialtyFilter}>
          <SelectTrigger
            ref={triggerRef}
            onClick={() => setOpenSelect(!openSelect)}
            className="w-[200px]"
          >
            <SelectValue
              value={specialtyFilter}
              placeholder="Filter by specialty"
            />
          </SelectTrigger>

          <SelectContent
            open={openSelect}
            onClose={() => setOpenSelect(false)}
            triggerRef={triggerRef}
            align="start"
            side="bottom"
          >
            {specialties.map((specialty) => (
              <SelectItem
                key={specialty}
                value={specialty}
                onSelect={() => setOpenSelect(false)}
              >
                {specialty}
              </SelectItem>
            ))}
          </SelectContent>
        </Select>
      </div>

      {/* Table */}
      <div className="relative rounded-md border border-border bg-white shadow-sm">
        <Table>
          <TableHeader>
            <TableRow>
              <TableHead>Doctor</TableHead>
              <TableHead>Specialty</TableHead>
              <TableHead>Contact</TableHead>
              <TableHead>Status</TableHead>
              <TableHead>Rating</TableHead>
              <TableHead>Patients</TableHead>
              <TableHead className="text-right">Actions</TableHead>
            </TableRow>
          </TableHeader>

          <TableBody>
            {filteredDoctors.length === 0 ? (
              <TableRow>
                <TableCell
                  colSpan={7}
                  className="text-center text-muted-foreground"
                >
                  No doctors found
                </TableCell>
              </TableRow>
            ) : (
              filteredDoctors.map((doctor) => (
                <TableRow key={doctor.id}>
                  {/* Doctor info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage src="/generic-placeholder-graphic.png" />
                        <AvatarFallback>
                          {doctor.name
                            .split(" ")
                            .slice(1)
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">{doctor.name}</div>
                        <div className="text-sm text-muted-foreground">
                          {doctor.experience}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">{doctor.specialty}</Badge>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {doctor.email}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {doctor.phone}
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={statusConfig[doctor.status].className}
                    >
                      {statusConfig[doctor.status].label}
                    </Badge>
                  </TableCell>

                  {/* Rating */}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">{doctor.rating}</span>
                    </div>
                  </TableCell>

                  {/* Patients */}
                  <TableCell>
                    <span className="font-medium">{doctor.patients}</span>
                  </TableCell>

                  {/* Actions */}
                  <TableCell className="text-right">
                    <DropdownMenu>
                      <DropdownMenuTrigger
                        asChild
                        onClick={() =>
                          setOpenId(openId === doctor.id ? null : doctor.id)
                        }
                      >
                        <Button variant="ghost" size="icon">
                          <MoreHorizontal className="h-4 w-4" />
                        </Button>
                      </DropdownMenuTrigger>

                      <DropdownMenuContent
                        align="end"
                        side="bottom"
                        sideOffset={6}
                        open={openId === doctor.id}
                        onClose={() => setOpenId(null)}
                      >
                        <DropdownMenuLabel>Actions</DropdownMenuLabel>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem>
                          <Edit className="mr-2 h-4 w-4 text-blue-500" />
                          Edit Profile
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Calendar className="mr-2 h-4 w-4 text-purple-500" />
                          View Schedule
                        </DropdownMenuItem>
                        <DropdownMenuItem>
                          <Mail className="mr-2 h-4 w-4 text-teal-600" />
                          Send Email
                        </DropdownMenuItem>
                        <DropdownMenuSeparator />
                        <DropdownMenuItem className="text-red-600">
                          <Trash2 className="mr-2 h-4 w-4" />
                          Remove Doctor
                        </DropdownMenuItem>
                      </DropdownMenuContent>
                    </DropdownMenu>
                  </TableCell>
                </TableRow>
              ))
            )}
          </TableBody>
        </Table>
      </div>
    </div>
  )
}
