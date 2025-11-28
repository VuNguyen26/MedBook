import { useState, useRef, useEffect } from "react";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import {
  MoreHorizontal,
  Mail,
  Phone,
  Edit,
  Trash2,
  Calendar,
  Star,
} from "lucide-react";
import {
  DropdownMenu,
  DropdownMenuContent,
  DropdownMenuItem,
  DropdownMenuLabel,
  DropdownMenuSeparator,
  DropdownMenuTrigger,
} from "@/components/ui/dropdown-menu";
import { Input } from "@/components/ui/input";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import doctorApi from "@/api/doctorApi";
import { toast } from "react-toastify";

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
};

const specialties = [
  "All Specialties",
  "Cardiology",
  "Neurology",
  "Pediatrics",
  "Orthopedics",
  "Dermatology",
  "General Surgery",
];

// ==================== Component ====================
export default function DoctorsTable({ filter }) {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [searchQuery, setSearchQuery] = useState("");
  const [specialtyFilter, setSpecialtyFilter] = useState("All Specialties");

  const [openId, setOpenId] = useState(null);

  const [openSelect, setOpenSelect] = useState(false);
  const triggerRef = useRef(null);

  // Fetch doctors data
  useEffect(() => {
    const fetchDoctors = async () => {
      try {
        setLoading(true);
        const response = await doctorApi.getAll();
        // Assuming the API returns doctors in response.data
        setDoctors(response.data || []);
      } catch (err) {
        console.error("Error fetching doctors:", err);
        setError(err.message || "Failed to fetch doctors");
        toast.error("Failed to load doctors data");
      } finally {
        setLoading(false);
      }
    };

    fetchDoctors();
  }, []);

  const filteredDoctors = doctors.filter((doctor) => {
    const matchesSearch =
      (doctor.name || doctor.fullName || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase()) ||
      (doctor.specialty || doctor.specialization || "")
        .toLowerCase()
        .includes(searchQuery.toLowerCase());
    const matchesStatus =
      !filter || filter === "all" || (doctor.status || "available") === filter;
    const matchesSpecialty =
      specialtyFilter === "All Specialties" ||
      (doctor.specialty || doctor.specialization) === specialtyFilter;
    return matchesSearch && matchesStatus && matchesSpecialty;
  });

  if (loading) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600 mx-auto mb-2"></div>
            <p className="text-gray-500">Loading doctors...</p>
          </div>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="space-y-4">
        <div className="flex items-center justify-center py-8">
          <div className="text-center">
            <p className="text-red-500 mb-4">Error: {error}</p>
            <Button onClick={() => window.location.reload()} variant="outline">
              Retry
            </Button>
          </div>
        </div>
      </div>
    );
  }

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
                <TableRow key={doctor.id || doctor.doctorId}>
                  {/* Doctor info */}
                  <TableCell>
                    <div className="flex items-center gap-3">
                      <Avatar className="h-10 w-10">
                        <AvatarImage
                          src={
                            doctor.imageUrl || doctor.image_url || doctor.avatar
                              ? (
                                  doctor.imageUrl ||
                                  doctor.image_url ||
                                  doctor.avatar
                                ).startsWith("http")
                                ? doctor.imageUrl ||
                                  doctor.image_url ||
                                  doctor.avatar
                                : `${window.location.origin}${
                                    doctor.imageUrl ||
                                    doctor.image_url ||
                                    doctor.avatar
                                  }`
                              : "/generic-placeholder-graphic.png"
                          }
                        />
                        <AvatarFallback>
                          {(doctor.name || doctor.fullName || "D")
                            .split(" ")
                            .slice(1)
                            .map((n) => n[0])
                            .join("")}
                        </AvatarFallback>
                      </Avatar>
                      <div>
                        <div className="font-medium">
                          {doctor.name || doctor.fullName || "Unknown Doctor"}
                        </div>
                        <div className="text-sm text-muted-foreground">
                          {doctor.experience ||
                            doctor.yearsOfExperience ||
                            "Experience N/A"}
                        </div>
                      </div>
                    </div>
                  </TableCell>

                  <TableCell>
                    <Badge variant="outline">
                      {doctor.specialty || doctor.specialization || "N/A"}
                    </Badge>
                  </TableCell>

                  {/* Contact */}
                  <TableCell>
                    <div className="space-y-1">
                      <div className="flex items-center gap-2 text-sm">
                        <Mail className="h-3 w-3 text-muted-foreground" />
                        {doctor.email || "No email"}
                      </div>
                      <div className="flex items-center gap-2 text-sm text-muted-foreground">
                        <Phone className="h-3 w-3" />
                        {doctor.phone || doctor.phoneNumber || "No phone"}
                      </div>
                    </div>
                  </TableCell>

                  {/* Status */}
                  <TableCell>
                    <Badge
                      variant="secondary"
                      className={
                        (
                          statusConfig[doctor.status || "available"] ||
                          statusConfig["available"]
                        ).className
                      }
                    >
                      {
                        (
                          statusConfig[doctor.status || "available"] ||
                          statusConfig["available"]
                        ).label
                      }
                    </Badge>
                  </TableCell>

                  {/* Rating */}
                  <TableCell>
                    <div className="flex items-center gap-1">
                      <Star className="h-4 w-4 fill-yellow-400 text-yellow-400" />
                      <span className="font-medium">
                        {doctor.rating || doctor.averageRating || "N/A"}
                      </span>
                    </div>
                  </TableCell>

                  {/* Patients */}
                  <TableCell>
                    <span className="font-medium">
                      {doctor.patientsCount || doctor.patientCount || 0}
                    </span>
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
  );
}
