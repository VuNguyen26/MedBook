import { FileText } from "lucide-react";

export default function DoctorRecords() {
  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">Hồ sơ bệnh án</h1>
      </div>
      <p className="text-gray-600">
        Hồ sơ bệnh án của bệnh nhân sẽ hiển thị tại đây.
      </p>
    </div>
  );
}
