import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { auth } from "../store/auth";

export default function Patient() {
  const user = auth.getCurrentUser();
  const [list, setList] = useState([]);
  const [qrModal, setQrModal] = useState({ open: false, qr: null });

  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/appointments/my", {
        headers: token ? { Authorization: `Bearer ${token}` } : {}
      })
      .then(async (res) => {
        let appts = res.data || [];

        // Load doctor name cho từng appointment
        for (let a of appts) {
          try {
            const doc = await axios.get(
              `http://localhost:8080/api/doctors/${a.doctorId}`
            );
            a.doctorName = doc.data.name;
          } catch (err) {
            a.doctorName = "Không xác định";
          }
        }

        setList([...appts]);
      })
      .catch((err) => {
        console.error("Lỗi tải danh sách lịch hẹn:", err);
        setList([]);
      });
  }, [user]);

  if (!user) {
    return (
      <div className="container-page py-8 text-red-600 font-semibold">
        ❌ Bạn chưa đăng nhập.
      </div>
    );
  }

  // ========================================================================
  // Mapping trạng thái → tiếng Việt + màu
  // ========================================================================
  const statusBadge = (status) => {
    const map = {
      PENDING: { text: "Chờ xác nhận", bg: "bg-yellow-100", color: "text-yellow-700" },
      CONFIRMED: { text: "Đã xác nhận", bg: "bg-blue-100", color: "text-blue-700" },
      PAID: { text: "Đã thanh toán", bg: "bg-green-100", color: "text-green-700" },
      CANCELLED: { text: "Đã hủy", bg: "bg-red-100", color: "text-red-700" },
    };

    const s = map[status] || { text: status, bg: "bg-gray-100", color: "text-gray-700" };

    return (
      <span className={`px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}>
        {s.text}
      </span>
    );
  };

  // ========================================================================
  // Mở modal QR
  // ========================================================================
  async function openQR(appointmentId) {
    try {
      const res = await axios.get(
        `http://localhost:8080/api/appointments/${appointmentId}/qr`
      );

      const base64 = "data:image/png;base64," + res.data;

      setQrModal({ open: true, qr: base64 });
    } catch (err) {
      console.error("Lỗi tải QR:", err);
    }
  }

  return (
    <div className="container-page py-8 space-y-5">
      <div className="section-title">Lịch hẹn của tôi</div>

      <div className="card p-4 overflow-x-auto">
        <table className="min-w-full text-sm">
          <thead>
            <tr className="text-left text-slate-600">
              <th className="p-2">Mã</th>
              <th className="p-2">Bác sĩ</th>
              <th className="p-2">Thời gian</th>
              <th className="p-2">Trạng thái</th>
              <th className="p-2">Thanh toán</th>
              <th className="p-2">Hành động</th>
            </tr>
          </thead>

          <tbody>
            {list.map((a) => (
              <tr key={a.id} className="border-t">
                <td className="p-2 font-semibold">#{a.id}</td>

                <td className="p-2">{a.doctorName}</td>

                <td className="p-2">
                  {dayjs(a.appointmentDate).format("DD/MM/YYYY")}{" "}
                  {a.appointmentTime?.slice(0, 5)}
                </td>

                <td className="p-2">{statusBadge(a.status)}</td>

                <td className="p-2">
                  {a.paymentStatus === "PAID" ? (
                    <span className="text-green-600 font-semibold">Đã thanh toán</span>
                  ) : (
                    <span className="text-red-500 font-semibold">Chưa thanh toán</span>
                  )}
                </td>

                <td className="p-2">
                  <button
                    onClick={() => openQR(a.id)}
                    className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
                  >
                    Xem chi tiết
                  </button>
                </td>
              </tr>
            ))}

            {list.length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-slate-500 text-center">
                  Chưa có lịch hẹn nào.
                </td>
              </tr>
            )}
          </tbody>

        </table>
      </div>

      {/* ========================================= */}
      {/* MODAL QR CODE */}
      {/* ========================================= */}
      {qrModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center space-y-4">
            <h2 className="text-lg font-bold">Mã QR Check-in</h2>

            {qrModal.qr ? (
              <img src={qrModal.qr} alt="QR Code" className="w-48 h-48 mx-auto rounded-lg" />
            ) : (
              <p>Đang tải...</p>
            )}

            <button
              onClick={() => setQrModal({ open: false, qr: null })}
              className="w-full py-2 bg-red-500 text-white rounded-lg hover:bg-red-600"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

    </div>
  );
}
