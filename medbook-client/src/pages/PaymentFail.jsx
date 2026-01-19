import { useEffect, useRef } from "react";
import { useLocation, useNavigate, useParams } from "react-router-dom";
import { XCircle } from "lucide-react";
import { toast } from "react-toastify";

export default function PaymentFail() {
  const { appointmentId } = useParams();
  const navigate = useNavigate();
  const { state } = useLocation();

  const bookingState = state || {};
  const { doctor, date, time, paymentFail } = bookingState;

  // Prevent duplicate toast
  const shownRef = useRef(false);

  // =========================
  // UPDATE BE → ĐÁNH DẤU PAYMENT FAILED
  // =========================
  useEffect(() => {
    if (!appointmentId) return;

    const updateFailStatus = async () => {
      try {
        const token = localStorage.getItem("token");
        if (!token) return;

        await fetch(
          `http://localhost:8080/api/appointments/${appointmentId}/fail`,
          {
            method: "PUT",
            headers: {
              "Content-Type": "application/json",
              Authorization: `Bearer ${token}`,
            },
          }
        );
      } catch (err) {
        console.error("❌ Lỗi đánh dấu FAIL:", err);
      }
    };

    updateFailStatus();
  }, [appointmentId]);

  // =========================
  // Toast lỗi
  // =========================
  useEffect(() => {
    if (!paymentFail || shownRef.current) return;

    shownRef.current = true;
    toast.error("❌ Thanh toán thất bại!");
  }, [paymentFail]);

  // =========================
  // Retry thanh toán
  // =========================
  const handleRetry = () => {
    if (!appointmentId) return;

    navigate(`/payment/${appointmentId}`, {
      state: {
        ...bookingState,
        retry: true,
      },
    });
  };

  return (
    <div className="bg-gray-50 min-h-screen flex items-center justify-center px-4 py-10">
      <div className="bg-white max-w-2xl w-full rounded-3xl shadow-xl p-10 text-center">
        <XCircle className="mx-auto text-red-600 w-20 h-20 mb-6" />

        <h1 className="text-3xl font-extrabold text-gray-900 mb-2">
          Thanh toán thất bại!
        </h1>

        <p className="text-gray-600 mb-6">
          Giao dịch không thành công. Vui lòng thử lại hoặc chọn phương thức
          thanh toán khác.
        </p>

        <div className="bg-gray-50 rounded-xl p-6 text-left space-y-4 border border-gray-200">
          {doctor?.name && (
            <p>
              <strong>Bác sĩ:</strong> {doctor.name}
            </p>
          )}
          {date && (
            <p>
              <strong>Ngày khám:</strong> {date}
            </p>
          )}
          {time && (
            <p>
              <strong>Giờ khám:</strong> {time}
            </p>
          )}
          <p>
            <strong>Mã lịch hẹn:</strong> #{appointmentId}
          </p>
        </div>

        <div className="mt-8 flex flex-col md:flex-row gap-4 justify-center">
          <button
            onClick={handleRetry}
            className="px-6 py-3 bg-black text-white rounded-xl hover:bg-gray-900 transition"
          >
            Thử thanh toán lại
          </button>

          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gray-200 text-black rounded-xl hover:bg-gray-300 transition"
          >
            Về trang chủ
          </button>
        </div>
      </div>
    </div>
  );
}
