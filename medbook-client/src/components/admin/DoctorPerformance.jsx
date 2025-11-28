import { useState, useEffect } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Progress } from "@/components/ui/progress";
import doctorApi from "@/api/doctorApi";
import { toast } from "react-toastify";

export default function DoctorPerformance() {
  const [doctors, setDoctors] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchDoctorPerformanceData = async () => {
      try {
        const response = await doctorApi.getAll();
        const allDoctors = response.data || [];

        // Process doctors data and calculate performance metrics
        const processedDoctors = allDoctors.map((doctor) => {
          const rawImageUrl =
            doctor.imageUrl || doctor.image_url || doctor.avatar;
          const finalImageUrl = rawImageUrl
            ? rawImageUrl.startsWith("http")
              ? rawImageUrl
              : `${window.location.origin}${rawImageUrl}`
            : "/placeholder.svg?height=40&width=40";

          console.log(
            `Doctor ${doctor.name}: raw imageUrl = ${rawImageUrl}, final URL = ${finalImageUrl}`
          );

          return {
            name: doctor.name || doctor.fullName || "Unknown Doctor",
            specialty: doctor.specialty || doctor.specialization || "General",
            rating: Math.round(
              (doctor.rating || doctor.averageRating || 4.5) * 20
            ), // Convert to percentage (4.5 * 20 = 90%)
            patients:
              doctor.patientsCount ||
              doctor.patientCount ||
              Math.floor(Math.random() * 100) + 50, // Fallback if no patient count
            avatar: finalImageUrl,
          };
        });

        // Sort by rating (descending) and take top 5
        const topDoctors = processedDoctors
          .sort((a, b) => b.rating - a.rating)
          .slice(0, 5);

        setDoctors(topDoctors);
      } catch (error) {
        console.error("Error fetching doctor performance data:", error);
        toast.error("Failed to load doctor performance data");
        // Fallback to empty data
        setDoctors([]);
      } finally {
        setLoading(false);
      }
    };

    fetchDoctorPerformanceData();
  }, []);

  if (loading) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <div className="animate-spin rounded-full h-8 w-8 border-b-2 border-blue-600"></div>
      </div>
    );
  }

  if (doctors.length === 0) {
    return (
      <div className="flex items-center justify-center h-[200px]">
        <p className="text-muted-foreground">No doctor data available</p>
      </div>
    );
  }

  return (
    <div className="space-y-6">
      {doctors.map((doctor, index) => (
        <div key={doctor.name || index} className="space-y-2">
          <div className="flex items-center gap-3">
            <Avatar className="h-10 w-10">
              <AvatarImage src={doctor.avatar} />
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
  );
}
