import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { FileText, Star } from "lucide-react";

export default function DoctorRecords() {

  const token = localStorage.getItem("token");
  const userJson = localStorage.getItem("user");
  const user = userJson ? JSON.parse(userJson) : null;

  const [doctor, setDoctor] = useState(null);
  const [records, setRecords] = useState([]);

  // ⭐ Bước 1 — từ email user -> tìm doctor
  useEffect(() => {
    async function loadDoctor() {
      try {
        if (!user?.email) return;

        const res = await axios.get(
          `http://localhost:8080/api/doctors/email/${encodeURIComponent(
            user.email
          )}`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        setDoctor(res.data);
        console.log(">>> Doctor:", res.data);

      } catch (err) {
        console.error("❌ Không tìm thấy bác sĩ:", err);
      }
    }

    loadDoctor();
  }, [user]);

  // ⭐ Bước 2 — Khi có doctor.id -> lấy danh sách reviews
  useEffect(() => {
    if (!doctor?.id) return;

    async function loadReviews() {
      try {
        const res = await axios.get(
          `http://localhost:8080/api/appointments/doctor/${doctor.id}/reviews`,
          { headers: { Authorization: `Bearer ${token}` } }
        );

        const reviews = res.data || [];

        const mapped = await Promise.all(
          reviews.map(async (r) => {
            try {
              // ⭐ Lấy theo patientId (đúng nhất)
              const p = await axios.get(
                `http://localhost:8080/api/patients/${r.patientId}`,
                { headers: { Authorization: `Bearer ${token}` } }
              );

              return {
                ...r,
                patientName: p.data.full_name,   // ⭐ đúng key
              };

            } catch (err) {
              console.error("❌ Lỗi lấy bệnh nhân:", err);
              return { ...r, patientName: "Ẩn Danh" };
            }
          })
        );

        setRecords(mapped);

      } catch (err) {
        console.error("❌ Lỗi tải reviews:", err);
      }
    }

    loadReviews();
  }, [doctor, token]);

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-4">
        <FileText className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">Hồ sơ bệnh án</h1>
      </div>

      {!doctor && (
        <p className="text-sm text-gray-500">
          Không tìm thấy thông tin bác sĩ gắn với tài khoản.
        </p>
      )}

      {records.length === 0 && (
        <p className="text-gray-600 mt-3">Chưa có đánh giá nào.</p>
      )}

      {records.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3 text-left">Bệnh nhân</th>
              <th className="p-3 text-left">Ngày</th>
              <th className="p-3 text-left">Giờ</th>
              <th className="p-3 text-left">Đánh giá</th>
              <th className="p-3 text-left">Nhận xét</th>
            </tr>
          </thead>
          <tbody>
            {records.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">{a.patientName}</td>

                <td className="p-3">
                  {a.appointmentDate
                    ? dayjs(a.appointmentDate).format("DD/MM/YYYY")
                    : "-"}
                </td>

                <td className="p-3">
                  {a.appointmentTime
                    ? a.appointmentTime.slice(0, 5)
                    : "--:--"}
                </td>

                <td className="p-3 flex gap-1">
                  {[...Array(a.rating || 0)].map((_, i) => (
                    <Star
                      key={i}
                      className="text-amber-400 fill-amber-400 w-4 h-4"
                    />
                  ))}
                </td>

                <td className="p-3 text-gray-700">
                  {a.ratingComment || "Không có nhận xét"}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
