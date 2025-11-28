import { useState, useEffect } from "react";
import { Badge } from "@/components/ui/badge";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import appointmentApi from "@/api/appointmentApi";
import { toast } from "react-toastify";

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
};

export default function RecentAppointments() {
  const [appointments, setAppointments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchRecentAppointments = async () => {
      try {
        const response = await appointmentApi.getAll();
        const allAppointments = response.data || [];

        // Process and sort appointments by date (most recent first)
        const processedAppointments = allAppointments
          .map((appointment) => {
            const rawStatus = (appointment.status || "PENDING").toUpperCase();
            let statusKey = "pending";

            if (rawStatus === "COMPLETED") statusKey = "completed";
            else if (rawStatus === "CANCELLED") statusKey = "cancelled";
            else if (rawStatus === "CONFIRMED") statusKey = "in-progress";

            // Chỉ hiển thị NGÀY hẹn (không hiển thị giờ)
            const rawTime =
              appointment.appointmentDate ||
              appointment.date ||
              appointment.createdAt ||
              null;

            return {
            id: appointment.id || appointment.appointmentId,
              patient:
                appointment.patientName ||
                appointment.patient?.name ||
                "Unknown Patient",
              doctor:
                appointment.doctorName ||
                appointment.doctor?.name ||
                "Unknown Doctor",
              time: rawTime,
              status: statusKey,
            type: appointment.service || appointment.type || "Consultation",
              avatar:
                appointment.patient?.avatar ||
                appointment.patient?.imageUrl ||
                appointment.patient?.image_url
                  ? (
                      appointment.patient.avatar ||
                      appointment.patient.imageUrl ||
                      appointment.patient.image_url
                    ).startsWith("http")
                    ? appointment.patient.avatar ||
                      appointment.patient.imageUrl ||
                      appointment.patient.image_url
                    : `${window.location.origin}${
                        appointment.patient.avatar ||
                        appointment.patient.imageUrl ||
                        appointment.patient.image_url
                      }`
                  : "/generic-placeholder-graphic.png",
            };
          })
          .filter((appointment) => appointment.time) // Only include appointments with dates
          .sort((a, b) => new Date(b.time) - new Date(a.time)) // Sort by most recent
          .slice(0, 5); // Take only the 5 most recent

        // Format time for display
        const formattedAppointments = processedAppointments.map(
          (appointment) => ({
          ...appointment,
            time: formatAppointmentTime(appointment.time),
          })
        );

        setAppointments(formattedAppointments);
      } catch (error) {
        console.error("Error fetching recent appointments:", error);
        toast.error("Failed to load recent appointments");
        // Fallback to empty data
        setAppointments([]);
      } finally {
        setLoading(false);
      }
    };

    fetchRecentAppointments();
  }, []);

  const formatAppointmentTime = (dateString) => {
    try {
      if (!dateString) return "N/A";
      const date = new Date(dateString);
      // Luôn hiển thị NGÀY theo định dạng Việt Nam
      return date.toLocaleDateString("vi-VN", {
        day: "2-digit",
        month: "2-digit",
        year: "numeric",
      });
    } catch (error) {
      return "N/A";
    }
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (appointments.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground text-sm">No recent appointments</p>
      </div>
    );
  }

  return (
    <div className="space-y-4">
      {appointments.map((appointment) => (
        <div key={appointment.id} className="flex items-center gap-4">
          <Avatar className="h-10 w-10">
            <AvatarImage src={appointment.avatar} />
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
              <p className="text-xs text-muted-foreground">
                {appointment.type}
              </p>
            </div>
          </div>
          <Badge
            variant="secondary"
            className={
              (statusConfig[appointment.status] || statusConfig["pending"])
                .className
            }
          >
            {
              (statusConfig[appointment.status] || statusConfig["pending"])
                .label
            }
          </Badge>
        </div>
      ))}
    </div>
  );
}
