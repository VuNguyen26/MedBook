import { useEffect, useState } from "react";
import axios from "axios";
import dayjs from "dayjs";
import { auth } from "../store/auth";
import { Star } from "lucide-react";

export default function Patient() {
  const user = auth.getCurrentUser();

  // Danh sách lịch hẹn
  const [list, setList] = useState([]);

  // Tab hiện tại
  const [activeTab, setActiveTab] = useState("UPCOMING");

  // QR Modal
  const [qrModal, setQrModal] = useState({ open: false, qr: null });

  // Detail Modal
  const [detailModal, setDetailModal] = useState({ open: false, appt: null });

  // Rating Modal
  const [ratingModal, setRatingModal] = useState({
    open: false,
    appt: null,
    rating: 5,
    comment: "",
  });

  // ============================================================
  //  Load appointments
  // ============================================================
  useEffect(() => {
    if (!user) return;

    const token = localStorage.getItem("token");

    axios
      .get("http://localhost:8080/api/appointments/my", {
        headers: token ? { Authorization: `Bearer ${token}` } : {},
      })
      .then(async (res) => {
        let appts = res.data || [];

        // Load thêm tên bác sĩ
        for (let a of appts) {
          try {
            const doc = await axios.get(
              `http://localhost:8080/api/doctors/${a.doctorId}`
            );
            a.doctorName = doc.data.name;
          } catch {
            a.doctorName = "Không xác định";
          }
        }

        console.log(">>> Appointments:", appts);
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

  // ============================================================
  // Status badge UI (chỉ dùng cho field status)
  // ============================================================
  const statusBadge = (status) => {
    const map = {
      PENDING: {
        text: "Chờ xác nhận",
        bg: "bg-yellow-100",
        color: "text-yellow-700",
      },
      CONFIRMED: {
        text: "Đã xác nhận",
        bg: "bg-blue-100",
        color: "text-blue-700",
      },
      PAID: {
        text: "Đã thanh toán (chờ khám)",
        bg: "bg-emerald-100",
        color: "text-emerald-700",
      },
      CHECKED_IN: {
        text: "Đã check-in",
        bg: "bg-indigo-100",
        color: "text-indigo-700",
      },
      COMPLETED: {
        text: "Hoàn thành",
        bg: "bg-green-200",
        color: "text-green-800",
      },
      CANCELLED: {
        text: "Đã hủy",
        bg: "bg-red-200",
        color: "text-red-800",
      },
    };

    const s = map[status] || {
      text: status,
      bg: "bg-gray-100",
      color: "text-gray-700",
    };

    return (
      <span
        className={`px-3 py-1 rounded-full text-xs font-semibold ${s.bg} ${s.color}`}
      >
        {s.text}
      </span>
    );
  };

  // ============================================================
  // FILTER LIST theo TAB – dựa trên cả status + paymentStatus
  // ============================================================
  function filteredList() {
    return list.filter((a) => {
      const st = a.status;
      const pay = a.paymentStatus;

      if (activeTab === "UPCOMING") {
        // chưa hủy & chưa fail
        const isCancelled = st === "CANCELLED";
        const isFailed = pay === "FAILED";
        return !isCancelled && !isFailed;
      }

      if (activeTab === "COMPLETED") {
        return st === "COMPLETED";
      }

      // ĐÃ HỦY / THẤT BẠI
      if (activeTab === "CANCELLED") {
        return st === "CANCELLED" || pay === "FAILED";
      }

      return true;
    });
  }

  // ============================================================
  // OPEN QR
  // ============================================================
  async function openQR(id) {
    const a = list.find((x) => x.id === id);
    if (!a || a.paymentStatus !== "PAID") {
      return alert("Chỉ xem QR khi lịch hẹn đã thanh toán.");
    }

    try {
      const res = await fetch(
        `http://localhost:8080/api/appointments/${id}/qr`
      );
      if (!res.ok) {
        console.error("Không lấy được QR:", await res.text());
        return;
      }

      const blob = await res.blob();
      const url = URL.createObjectURL(blob);

      setQrModal({ open: true, qr: url });
    } catch (err) {
      console.error("Lỗi QR:", err);
    }
  }

  // ============================================================
  // CANCEL Appointment – dùng đúng endpoint của backend
  // ============================================================
  async function cancelAppointment(id) {
    const ok = window.confirm("Bạn có chắc muốn hủy lịch hẹn này?");
    if (!ok) return;

    const token = localStorage.getItem("token");

    try {
      await axios.put(
        `http://localhost:8080/api/appointments/${id}/cancel-unpaid`,
        {},
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      alert("Đã hủy lịch hẹn!");

      // update local state
      setList((prev) =>
        prev.map((a) =>
          a.id === id
            ? { ...a, status: "CANCELLED", paymentStatus: "UNPAID", paid: false }
            : a
        )
      );
    } catch (err) {
      console.error("Hủy lịch thất bại:", err.response || err);
      alert(
        "Không thể hủy lịch: " +
          (err.response?.data?.message || err.response?.data || err.message)
      );
    }
  }

  // ============================================================
  // SUBMIT Rating – BE bạn chưa có, phần này để sẵn
  // ============================================================
  async function submitRating() {
    const { appt, rating, comment } = ratingModal;
    const token = localStorage.getItem("token");

    try {
      await axios.post(
        `http://localhost:8080/api/appointments/${appt.id}/rating`,
        { rating, comment },
        { headers: token ? { Authorization: `Bearer ${token}` } : {} }
      );

      alert("Cảm ơn bạn đã đánh giá!");

      setList((prev) =>
        prev.map((a) =>
          a.id === appt.id ? { ...a, rated: true, rating } : a
        )
      );

      setRatingModal({ open: false, appt: null, rating: 5, comment: "" });
    } catch (err) {
      console.error("Rating error:", err.response || err);
      alert("Gửi đánh giá thất bại.");
    }
  }

  return (
    <div className="container-page py-8 space-y-5">
      <div className="section-title">Lịch hẹn của tôi</div>

      {/* Tabs */}
      <div className="flex gap-2 mb-3">
        {[
          { key: "UPCOMING", label: "Sắp diễn ra" },
          { key: "COMPLETED", label: "Đã hoàn thành" },
          { key: "CANCELLED", label: "Đã hủy / thất bại" },
        ].map((tab) => (
          <button
            key={tab.key}
            onClick={() => setActiveTab(tab.key)}
            className={`px-4 py-2 rounded-full text-sm font-semibold border ${
              activeTab === tab.key
                ? "bg-blue-600 text-white border-blue-600"
                : "bg-white text-slate-700 border-slate-300"
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* LIST */}
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
            {filteredList().map((a) => (
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
                    <span className="text-green-600 font-semibold">
                      Đã thanh toán
                    </span>
                  ) : a.paymentStatus === "FAILED" ? (
                    <span className="text-red-500 font-semibold">
                      Thanh toán thất bại
                    </span>
                  ) : (
                    <span className="text-orange-500 font-semibold">
                      Chưa thanh toán
                    </span>
                  )}
                </td>

                {/* Hành động */}
                <td className="p-2 space-x-2">
                  {/* QR – chỉ hiện nếu đã thanh toán */}
                  {a.paymentStatus === "PAID" && (
                    <button
                      onClick={() => openQR(a.id)}
                      className="px-3 py-1 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-xs"
                    >
                      QR
                    </button>
                  )}

                  {/* Chi tiết */}
                  <button
                    onClick={() => setDetailModal({ open: true, appt: a })}
                    className="px-3 py-1 bg-slate-200 rounded-md hover:bg-slate-300 text-xs"
                  >
                    Chi tiết
                  </button>

                  {/* Hủy: chỉ khi chưa thanh toán + status PENDING/CONFIRMED */}
                  {["PENDING", "CONFIRMED"].includes(a.status) &&
                    a.paymentStatus !== "PAID" && (
                      <button
                        onClick={() => cancelAppointment(a.id)}
                        className="px-3 py-1 bg-red-200 text-red-700 rounded-md hover:bg-red-300 text-xs"
                      >
                        Hủy
                      </button>
                    )}

                  {/* Rating: để sẵn – chỉ dùng khi BE hỗ trợ COMPLETED + rated */}
                  {a.status === "COMPLETED" && !a.rated && (
                    <button
                      onClick={() =>
                        setRatingModal({
                          open: true,
                          appt: a,
                          rating: 5,
                          comment: "",
                        })
                      }
                      className="px-3 py-1 bg-amber-200 text-amber-700 rounded-md hover:bg-amber-300 text-xs"
                    >
                      Đánh giá
                    </button>
                  )}
                </td>
              </tr>
            ))}

            {filteredList().length === 0 && (
              <tr>
                <td colSpan={6} className="p-4 text-slate-500 text-center">
                  Không có lịch hẹn.
                </td>
              </tr>
            )}
          </tbody>
        </table>
      </div>

      {/* QR MODAL */}
      {qrModal.open && (
        <div className="fixed inset-0 bg-black/50 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-80 text-center space-y-4">
            <h2 className="text-lg font-bold">Mã QR Check-in</h2>

            {qrModal.qr ? (
              <img
                src={qrModal.qr}
                alt="QR Code"
                className="w-48 h-48 mx-auto rounded-lg"
              />
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

      {/* DETAIL MODAL */}
      {detailModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-3">
            <h2 className="text-lg font-bold">
              Chi tiết lịch hẹn #{detailModal.appt.id}
            </h2>

            <p>
              <strong>Bác sĩ:</strong> {detailModal.appt.doctorName}
            </p>
            <p>
              <strong>Ngày:</strong>{" "}
              {dayjs(detailModal.appt.appointmentDate).format("DD/MM/YYYY")}
            </p>
            <p>
              <strong>Giờ:</strong>{" "}
              {detailModal.appt.appointmentTime?.slice(0, 5)}
            </p>
            <p>
              <strong>Trạng thái:</strong>{" "}
              {statusBadge(detailModal.appt.status)}
            </p>
            <p>
              <strong>Thanh toán:</strong>{" "}
              {detailModal.appt.paymentStatus === "PAID"
                ? "Đã thanh toán"
                : detailModal.appt.paymentStatus === "FAILED"
                ? "Thanh toán thất bại"
                : "Chưa thanh toán"}
            </p>

            <button
              onClick={() => setDetailModal({ open: false, appt: null })}
              className="w-full py-2 bg-slate-200 rounded-lg hover:bg-slate-300"
            >
              Đóng
            </button>
          </div>
        </div>
      )}

      {/* RATING MODAL (để sẵn) */}
      {ratingModal.open && (
        <div className="fixed inset-0 bg-black/40 flex items-center justify-center z-50">
          <div className="bg-white p-6 rounded-xl shadow-xl w-96 space-y-4">
            <h2 className="text-lg font-bold">
              Đánh giá bác sĩ {ratingModal.appt.doctorName}
            </h2>

            <div className="flex gap-1">
              {[1, 2, 3, 4, 5].map((i) => (
                <button
                  key={i}
                  onClick={() =>
                    setRatingModal((prev) => ({ ...prev, rating: i }))
                  }
                >
                  <Star
                    className={`h-7 w-7 ${
                      ratingModal.rating >= i
                        ? "text-amber-400 fill-amber-400"
                        : "text-gray-300"
                    }`}
                  />
                </button>
              ))}
            </div>

            <textarea
              value={ratingModal.comment}
              onChange={(e) =>
                setRatingModal((prev) => ({
                  ...prev,
                  comment: e.target.value,
                }))
              }
              placeholder="Nhận xét của bạn..."
              className="w-full border rounded-lg p-2"
              rows={3}
            />

            <button
              onClick={submitRating}
              className="w-full py-2 bg-blue-600 text-white rounded-lg hover:bg-blue-700"
            >
              Gửi đánh giá
            </button>

            <button
              onClick={() =>
                setRatingModal({
                  open: false,
                  appt: null,
                  rating: 5,
                  comment: "",
                })
              }
              className="w-full py-2 bg-slate-200 rounded-lg hover:bg-slate-300"
            >
              Hủy
            </button>
          </div>
        </div>
      )}
    </div>
  );
}
