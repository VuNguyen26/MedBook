import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Calendar, CheckCircle } from "lucide-react";

export default function DoctorSchedule() {
  const doctor = JSON.parse(localStorage.getItem("doctor"));
  const [list, setList] = useState([]);
  const [doctorId, setDoctorId] = useState(null);
  const token = localStorage.getItem("token");

  // ========================= FIND DOCTOR BY EMAIL =========================
  async function fetchDoctorIdByEmail(email) {
    try {
      const res = await axios.get("http://localhost:8080/api/doctors");
      const doctors = res.data;

      const found = doctors.find(
        (d) => d.email?.trim().toLowerCase() === email.trim().toLowerCase()
      );

      return found?.id || null;
    } catch (err) {
      console.error("❌ Lỗi lấy danh sách bác sĩ:", err);
      return null;
    }
  }

  // ========================= LOAD DOCTOR ID =========================
  useEffect(() => {
    if (!doctor) return;

    fetchDoctorIdByEmail(doctor.email).then((id) => {
      setDoctorId(id);
    });
  }, []);

  // ========================= LOAD PAID APPOINTMENTS =========================
  useEffect(() => {
    if (!doctorId) return;

    axios
      .get(`http://localhost:8080/api/appointments/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const paid = res.data.filter((a) => a.paymentStatus === "PAID");
        setList(paid);
      })
      .catch((err) => console.error("❌ Lỗi tải lịch:", err));
  }, [doctorId]);

  // ========================= CONFIRM APPOINTMENT =========================
  async function approve(id) {
    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${id}/confirm`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setList((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "CONFIRMED" } : a))
      );

      alert("Duyệt lịch thành công!");
    } catch (e) {
      alert("Lỗi duyệt lịch");
    }
  }

  // ========================= COMPLETE APPOINTMENT =========================
  async function complete(id) {
    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${id}/complete`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      setList((prev) =>
        prev.map((a) => (a.id === id ? { ...a, status: "COMPLETED" } : a))
      );

      alert("Đã đánh dấu hoàn thành!");
    } catch (e) {
      alert("Lỗi cập nhật trạng thái hoàn thành.");
    }
  }

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">Lịch khám</h1>
      </div>

      {!doctorId && <p className="text-gray-600">Đang tải dữ liệu...</p>}

      {doctorId && list.length === 0 && (
        <p className="text-gray-600">
          Chưa có lịch hẹn nào (chỉ hiển thị lịch đã thanh toán).
        </p>
      )}

      {doctorId && list.length > 0 && (
        <table className="min-w-full text-sm">
          <thead>
            <tr className="bg-gray-100 text-gray-600">
              <th className="p-3 text-left">Mã</th>
              <th className="p-3 text-left">Ngày</th>
              <th className="p-3 text-left">Giờ</th>
              <th className="p-3 text-left">Trạng thái</th>
              <th className="p-3 text-left">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {list.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">#{a.id}</td>

                <td className="p-3">
                  {dayjs(a.appointmentDate).format("DD/MM/YYYY")}
                </td>

                <td className="p-3">{a.appointmentTime?.slice(0, 5)}</td>

                {/* STATUS BADGE */}
                <td className="p-3">
                  {a.status === "COMPLETED" ? (
                    <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">
                      Đã hoàn thành
                    </span>
                  ) : a.status === "CONFIRMED" ? (
                    <span className="text-teal-700 bg-teal-100 px-3 py-1 rounded-full text-xs font-semibold">
                      Đã xác nhận
                    </span>
                  ) : (
                    <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-semibold">
                      Chờ xác nhận
                    </span>
                  )}
                </td>

                {/* ACTION BUTTONS */}
                <td className="p-3 space-x-2">
                  {a.status === "PENDING" && (
                    <button
                      onClick={() => approve(a.id)}
                      className="px-4 py-1 bg-teal-600 text-white rounded-lg text-xs hover:bg-teal-700"
                    >
                      Duyệt lịch
                    </button>
                  )}

                  {a.status === "CONFIRMED" && (
                    <button
                      onClick={() => complete(a.id)}
                      className="px-4 py-1 bg-blue-600 text-white rounded-lg text-xs hover:bg-blue-700"
                    >
                      Hoàn thành
                    </button>
                  )}

                  {a.status === "COMPLETED" && (
                    <CheckCircle className="text-green-600 w-5 h-5" />
                  )}
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}
