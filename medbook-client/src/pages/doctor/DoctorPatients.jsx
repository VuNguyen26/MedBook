import { Users } from "lucide-react";

export default function DoctorPatients() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <Users className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">Bệnh nhân</h1>
      </div>
      <p className="text-gray-600">
        Danh sách bệnh nhân của bác sĩ sẽ được hiển thị tại đây.
      </p>
    </div>
  );
}
