import { Calendar } from "lucide-react";

export default function DoctorSchedule() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Calendar className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">Lịch khám</h1>
      </div>
      <p className="text-gray-600">
        Lịch khám của bác sĩ sẽ được hiển thị tại đây.
      </p>
    </div>
  );
}
