import { useEffect, useMemo, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { Calendar, CheckCircle } from "lucide-react";

const API_BASE_URL = "http://localhost:8080/api";

export default function DoctorSchedule() {
  const doctor = useMemo(() => {
    try {
      const raw = localStorage.getItem("doctor");
      return raw ? JSON.parse(raw) : null;
    } catch (err) {
      console.error("❌ Doctor in localStorage is not valid JSON:", err);
      return null;
    }
  }, []);

  const token = useMemo(() => localStorage.getItem("token"), []);

  const [appointments, setAppointments] = useState([]);
  const [doctorId, setDoctorId] = useState(null);

  // ========================= FIND DOCTOR BY EMAIL =========================
  const fetchDoctorIdByEmail = async (email) => {
    try {
      const res = await axios.get(`${API_BASE_URL}/doctors`);
      const doctors = res.data || [];

      const normalizedEmail = email?.trim().toLowerCase();
      const found = doctors.find(
        (d) => d.email?.trim().toLowerCase() === normalizedEmail
      );

      return found?.id ?? null;
    } catch (err) {
      console.error("❌ Lỗi lấy danh sách bác sĩ:", err);
      return null;
    }
  };

  // ========================= LOAD DOCTOR ID =========================
  useEffect(() => {
    if (!doctor?.email) return;

    (async () => {
      const id = await fetchDoctorIdByEmail(doctor.email);
      setDoctorId(id);
    })();
    // doctor.email là dependency hợp lý
  }, [doctor?.email]);

  // ========================= LOAD PAID APPOINTMENTS =========================
  useEffect(() => {
    if (!doctorId) return;

    axios
      .get(`${API_BASE_URL}/appointments/doctor/${doctorId}`, {
        headers: { Authorization: `Bearer ${token}` },
      })
      .then((res) => {
        const data = res.data || [];
        const paidAppointments = data.filter((a) => a.paymentStatus === "PAID");
        setAppointments(paidAppointments);
      })
      .catch((err) => console.error("❌ Lỗi tải lịch:", err));
  }, [doctorId, token]);

  // ========================= UPDATE STATUS HELPERS =========================
  const updateStatusLocal = (id, nextStatus) => {
    setAppointments((prev) =>
      prev.map((a) => (a.id === id ? { ...a, status: nextStatus } : a))
    );
  };

  const callStatusApi = async ({ id, endpoint, nextStatus, successMsg, failMsg }) => {
    try {
      await axios.put(
        `${API_BASE_URL}/appointments/${id}/${endpoint}`,
        {},
        { headers: { Authorization: `Bearer ${token}` } }
      );

      updateStatusLocal(id, nextStatus);
      alert(successMsg);
    } catch (err) {
      console.error(`❌ Lỗi ${endpoint}:`, err);
      alert(failMsg);
    }
  };

  // ========================= ACTIONS =========================
  const approve = (id) =>
    callStatusApi({
      id,
      endpoint: "confirm",
      nextStatus: "CONFIRMED",
      successMsg: "Duyệt lịch thành công!",
      failMsg: "Lỗi duyệt lịch",
    });

  const complete = (id) =>
    callStatusApi({
      id,
      endpoint: "complete",
      nextStatus: "COMPLETED",
      successMsg: "Đã đánh dấu hoàn thành!",
      failMsg: "Lỗi cập nhật trạng thái hoàn thành.",
    });

  // ========================= UI HELPERS =========================
  const renderStatusBadge = (status) => {
    if (status === "COMPLETED") {
      return (
        <span className="text-green-700 bg-green-100 px-3 py-1 rounded-full text-xs font-semibold">
          Đã hoàn thành
        </span>
      );
    }

    if (status === "CONFIRMED") {
      return (
        <span className="text-teal-700 bg-teal-100 px-3 py-1 rounded-full text-xs font-semibold">
          Đã xác nhận
        </span>
      );
    }

    return (
      <span className="text-yellow-700 bg-yellow-100 px-3 py-1 rounded-full text-xs font-semibold">
        Chờ xác nhận
      </span>
    );
  };

  const isLoadingDoctor = doctor?.email && !doctorId;

  return (
    <div className="bg-white shadow-sm rounded-lg p-6">
      <div className="flex items-center gap-2 mb-6">
        <Calendar className="text-teal-600" />
        <h1 className="text-2xl font-bold text-teal-700">Lịch khám</h1>
      </div>

      {isLoadingDoctor && <p className="text-gray-600">Đang tải dữ liệu...</p>}

      {!isLoadingDoctor && doctorId && appointments.length === 0 && (
        <p className="text-gray-600">
          Chưa có lịch hẹn nào (chỉ hiển thị lịch đã thanh toán).
        </p>
      )}

      {!isLoadingDoctor && doctorId && appointments.length > 0 && (
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
            {appointments.map((a) => (
              <tr key={a.id} className="border-b hover:bg-gray-50">
                <td className="p-3 font-semibold">#{a.id}</td>

                <td className="p-3">
                  {dayjs(a.appointmentDate).format("DD/MM/YYYY")}
                </td>

                <td className="p-3">{a.appointmentTime?.slice(0, 5)}</td>

                <td className="p-3">{renderStatusBadge(a.status)}</td>

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
                    <CheckCircle className="text-green-600 w-5 h-5 inline-block" />
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
